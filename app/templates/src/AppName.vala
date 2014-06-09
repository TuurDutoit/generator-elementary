

using Granite.Services;

namespace <%= _.capitalize(appName) %> {
    
    public class <%= _.capitalize(appName) %>App : Granite.Application {
        
        private MainWindow window = null;
        
        construct {
            program_name = "<%= _.capitalize(appName) %>";
            exec_name = "<%= _.capitalize(appName) %>";
            
            build_data_dir = Constants.DATADIR;
            build_pkg_data_dir = Constants.PKGDATADIR;
            build_release_name = Constants.RELEASE_NAME;
            build_version = Constants.VERSION;
            build_version_info = Constants.VERSION_INFO;
            
            app_years = "2014";
            app_icon = "<%= _.slugify(appName) %>";
            app_launcher = "<%= _.slugify(appName) %>.desktop";
            application_id = "net.launchpad.<%= _.slugify(appName) %>";
            
            main_url = "https://code.launchpad.net/<%= _.slugify(appName) %>";
            bug_url = "https://bugs.launchpad.net/<%= _.slugify(appName) %>";
            help_url = "https://code.launchpad.net/<%= _.slugify(appName) %>";
            translate_url = "https://translations.launchpad.net/<%= _.slugify(appName) %>";
            
            about_authors = { "<%= authorName %> <<%= authorEmail %>>" };
            about_documenters = { "<%= authorName %> <<%= authorEmail %>>" };
            about_artists = { "<%= authorName %> <<%= authorEmail %>>" };
            about_comments = "<%= _.capitalize(appName) %>";
            about_translators = "";
            // Set the about_license_type property to set your license
        }
        
        public <%= _.capitalize(appName) %>App () {
            Logger.initialize ("<%= _.capitalize(appName) %>");
            Logger.DisplayLevel = LogLevel.DEBUG;   
        }
        
        //the application started
        public override void activate () {
            if (get_windows () == null) {
                window = new MainWindow (this);
                window.show_all ();
            } else {
                window.present ();
            }
        }
        
        //the application was requested to open some files
        public override void open (File [] files, string hint) {
            
        }
        
        public static void main (string [] args) {
            var app = new <%= _.capitalize(appName) %>.<%= _.capitalize(appName) %>App ();
            
            app.run (args);
        }
    }
}