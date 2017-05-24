var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var yosay = require("yosay");
var chalk = require("chalk");
var Color = require("color");


var ValaGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require("../package.json");

    this.on("end", function () {
      if (!this.options["skip-install"]) {
        //this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay("Welcome to the elementary OS app generator!"));

    var prompts = [{
      name: "appName",
      message: "What would you like to call your app?"
    },
    {
      name: "tagline",
      message: "What is your app\"s tagline?",
    },
    {
      type: "editor",
      name: "origDescription",
      message: "Add a description.\n  This will open an editor, supporting HTML."
    },
    {
      type: "list",
      name: "origLicense",
      message: "Which license do you want to use?",
      choices: [
        "GPLv3",
        "MIT",
        "Mozilla Public License 2.0",
        "Apache License 2.0",
        "BSD 3-Clause",
        "BSD 2-Clause",
        "AGPLv3",
        "LGPLv3",
        "Unlicense",
        "Other"
      ],
      default: 0
    },
    {
      type: "confirm",
      name: "publish",
      message: "Are you planning on publishing your app to AppCenter?",
      default: true
    },
    {
      name: "color",
      message: "Which color do you want the AppCenter page to be?",
      when: ifPublish,
      validate: validateColor,
      filter: filterColor
    },
    {
      name: "textColor",
      message: "What color should be used for the text in AppCenter?",
      when: ifPublish,
      validate: validateColor,
      filter: filterColor,
      default: defaultTextColor
    },
    {
      name: "price",
      message: "What is the suggested price of your app (in USD)?\n  Users will still be able to enter any amount, including 0.",
      when: ifPublish,
      filter: Number
    },
    {
      type: "list",
      name: "hosting",
      message: "Where are you going to host the source code?",
      choices: [
        "GitHub",
        "Launchpad",
        "Somewhere else"
      ],
      default: 0
    },
    {
      name: "authorUsername",
      message: "What is your GitHub username?",
      when: ifGitHub,
      default: this.user.git.username
    },
    {
      name: "authorUsername",
      message: "What is your Launchpad username?",
      when: ifLaunchpad
    },
    {
      name: "authorName",
      message: "What is your name?"
    },
    {
      name: "authorEmail",
      message: "What is your email?",
      default: this.user.git.email
    },];

    this.prompt(prompts, function (props) {
      Object.assign(this, props);
      this.AppName = this._.capitalize(this.appName);
      this.appNameSlug = this._.slugify(this.appName);
      this.license = props.origLicense.toLowerCase();
      this.LICENSE = props.origLicense.toUpperCase();
      this.year = new Date().getFullYear();

      if(this.origDescription.match(/\s*</)) {
        this.description = this.origDescription;
      }
      else {
        this.description = "<p>" + props.origDescription.replace("\n", "</p><p>") + "</p>";
      }

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir("cmake");
    this.mkdir("data");
    this.mkdir("po");
    this.mkdir("src");

    this._.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
    this.template("_AUTHORS", "AUTHORS");
    this.template("_CMakeLists.txt", "CMakeLists.txt");
    this.template("_quickbuild.sh", "quickbuild.sh");

    this.copy("_gitignore", ".gitignore");
  },

  srcfiles: function () {
    this.template("src/AppName.vala", "src/" + this.AppName + ".vala");
    this.template("src/MainWindow.vala", "src/" + "MainWindow.vala");
    this.template("src/config.vala", "src/" + "config.vala");
    this.template("src/config.vala.cmake", "src/" + "config.vala.cmake");
  },

  poFiles: function () {
    this.template("po/CMakeLists.txt", "po/" + "CMakeLists.txt");
  },

  dataFiles: function () {
    this.template("data/app.desktop", "data/" + this.appName.toLowerCase() + ".desktop");
  },

  cmakeFiles: function () {
    this.copy("cmake/FindVala.cmake", "cmake/FindVala.cmake");
    this.copy("cmake/GObjectIntrospectionMacros.cmake", "cmake/GObjectIntrospectionMacros.cmake");
    this.copy("cmake/GSettings.cmake", "cmake/GSettings.cmake");
    this.copy("cmake/Makefile", "cmake/Makefile");
    this.copy("cmake/ParseArguments.cmake", "cmake/ParseArguments.cmake");
    this.copy("cmake/README", "cmake/README");
    this.copy("cmake/README.Vala.rst", "cmake/README.Vala.rst");
    this.copy("cmake/Tests.cmake", "cmake/Tests.cmake");
    this.copy("cmake/Translations.cmake", "cmake/Translations.cmake");
    this.copy("cmake/ValaPrecompile.cmake", "cmake/ValaPrecompile.cmake");
    this.copy("cmake/ValaVersion.cmake", "cmake/ValaVersion.cmake");
  }
});

module.exports = ValaGenerator;




function ifPublish(answers) {
  return answers.publish;
}

function ifGitHub(answers) {
  return answers.hosting === "GitHub";
}

function ifLaunchpad(answers) {
  return answers.hosting === "Launchpad";
}

function validateColor(color, answers) {
  try {
    var c = new Color(color);
    return true;
  }
  catch(e) {
    return "Invalid color. The following formats are supported:\n" + Object.keys(Color).join(" ");
  }
}

function filterColor(color, answers) {
  return new Color(color);
}

function defaultTextColor(answers) {
  return answers.color.light() ? new Color("black") : new Color("white");
}
