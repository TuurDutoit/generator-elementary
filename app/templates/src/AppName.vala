

using Granite.Services;

namespace <%= AppName %> {

    public class <%= AppName %>App : Granite.Application {

        private MainWindow window = null;

        // Metadata
        construct {
            program_name = "<%= AppName %>";
            exec_name = "<%= AppName %>";

            build_data_dir = Constants.DATADIR;
            build_pkg_data_dir = Constants.PKGDATADIR;
            build_release_name = Constants.RELEASE_NAME;
            build_version = Constants.VERSION;
            build_version_info = Constants.VERSION_INFO;

            app_years = "<% year %>";
            app_icon = "<%= appNameSlug %>";
            app_launcher = "<%= appNameSlug %>.desktop";
            application_id = "net.launchpad.<%= appNameSlug %>";

            main_url = "https://code.launchpad.net/<%= appNameSlug %>";
            bug_url = "https://bugs.launchpad.net/<%= appNameSlug %>";
            help_url = "https://code.launchpad.net/<%= appNameSlug %>";
            translate_url = "https://translations.launchpad.net/<%= appNameSlug %>";

            about_authors = { "<%= authorName %> <<%= authorEmail %>>" };
            about_documenters = { "<%= authorName %> <<%= authorEmail %>>" };
            about_artists = { "<%= authorName %> <<%= authorEmail %>>" };
            about_comments = "<%= AppName %>";
            about_translators = "";
            // Set the about_license_type property to set your license
        }

        // Constructor
        public <%= AppName %>App () {
            Logger.initialize ("<%= AppName %>");
            Logger.DisplayLevel = LogLevel.DEBUG;
        }

        // The application started
        public override void activate () {
            if (get_windows () == null) {
                window = new MainWindow (this);
                window.show_all ();
            } else {
                window.present ();
            }
        }

        // The application was requested to open some files
        public override void open (File [] files, string hint) {

        }

        // Entry point
        public static void main (string [] args) {
            var app = new <%= AppName %>.<%= AppName %>App ();

            app.run (args);
        }
    }
}
