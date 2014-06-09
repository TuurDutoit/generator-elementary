'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var ValaGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        //this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Vala generator!'));

    var prompts = [{
      name: 'appName',
      message: 'What would you like to call your app?'
    },
    {
      name: 'authorName',
      message: 'What is your name?'
    },
    {
      name: 'authorEmail',
      message: 'What is your email?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.authorName = props.authorName;
      this.authorEmail = props.authorEmail;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('cmake');
    this.mkdir('data');
    this.mkdir('po');
    this.mkdir('src');

    this.template('_AUTHORS', 'AUTHORS');
    // this.template('_CMakeLists.txt', 'CMakeLists.txt', this, {
    //   evaluate: /\<\%\=([\s\S]+?)\%\>/g,
    //   interpolate: /\<\%\=([\s\S]+?)\%\>/g,
    //   escape: /\<\%\=([\s\S]+?)\%\>/g
    // });
    this.template('_quickbuild.sh', 'quickbuild.sh');

    this.copy('_gitignore', '.gitignore');
  },

  srcfiles: function () {
    this.template('src/AppName.vala', 'src/' + this._.capitalize(this.appName) + '.vala');
    this.template('src/MainWindow.vala', 'src/' + 'MainWindow.vala');
    this.template('src/config.vala', 'src/' + 'config.vala');
    this.template('src/config.vala.cmake', 'src/' + 'config.vala.cmake');
  },

  poFiles: function () {
    this.template('po/CMakeLists.txt', 'po/' + 'CMakeLists.txt');
  },

  dataFiles: function () {
    this.template('data/app.desktop', 'data/' + this.appName.toLowerCase() + '.desktop');
  },

  cmakeFiles: function () {
    this.copy('cmake/FindVala.cmake', 'cmake/FindVala.cmake');
    this.copy('cmake/GObjectIntrospectionMacros.cmake', 'cmake/GObjectIntrospectionMacros.cmake');
    this.copy('cmake/GSettings.cmake', 'cmake/GSettings.cmake');
    this.copy('cmake/Makefile', 'cmake/Makefile');
    this.copy('cmake/ParseArguments.cmake', 'cmake/ParseArguments.cmake');
    this.copy('cmake/README', 'cmake/README');
    this.copy('cmake/README.Vala.rst', 'cmake/README.Vala.rst');
    this.copy('cmake/Tests.cmake', 'cmake/Tests.cmake');
    this.copy('cmake/Translations.cmake', 'cmake/Translations.cmake');
    this.copy('cmake/ValaPrecompile.cmake', 'cmake/ValaPrecompile.cmake');
    this.copy('cmake/ValaVersion.cmake', 'cmake/ValaVersion.cmake');
  }
});

module.exports = ValaGenerator;
