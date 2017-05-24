/*global describe, beforeEach, it */
"use strict";
var path = require("path");
var helpers = require("yeoman-generator").test;

describe("elementary generator", function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator("elementary:app", [
        "../../app"
      ]);
      done();
    }.bind(this));
  });

  it("creates expected files", function (done) {
    var expected = [
      // add files you expect to exist here.
      //".jshintrc",
      //".editorconfig"
      "AUTHORS",
      "CMakeLists.txt",
      "quickbuild.sh"
    ];

    helpers.mockPrompt(this.app, {
      appName: "testApp",
      tagline: "This is just a test",
      origDescription: "This is a longer description, supporting HTML.",
      origLicense: "MIT",
      publish: true,
      color: "#123456",
      textColor: "#987654",
      price: "5",
      hosting: "GitHub",
      authorUsername: "TestUser",
      authorName: "Test User",
      authorEmail: "example@example.com"
    });
    this.app.options["skip-install"] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
