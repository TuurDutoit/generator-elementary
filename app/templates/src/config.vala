namespace Constants {
    public const string DATADIR = "/usr/local/share/<%= _.slugify(appName) %>";
    public const string PKGDATADIR = "/usr/local/share/<%= _.slugify(appName) %>/<%= _.slugify(appName) %>";
    public const string GETTEXT_PACKAGE = "<%= _.slugify(appName) %>";
    public const string RELEASE_NAME = "<%= _.capitalize(appName) %>";
    public const string VERSION = "0.1";
    public const string VERSION_INFO = "Release";
}
