

namespace <%= _.capitalize(appName) %> {
    
    public class MainWindow : Gtk.Window {
        
        private <%= _.capitalize(appName) %>App app;
        
        public MainWindow (<%= _.capitalize(appName) %>App app) {
            this.app = app;
            this.set_application (app);
            
            this.set_size_request (750, 450);
            this.window_position = Gtk.WindowPosition.CENTER;
            
            // Build UI
            setup_ui ();
            this.show_all ();
        }
        
        private void setup_ui () {
            var box = new Gtk.Box (Gtk.Orientation.VERTICAL, 0);
            
            // Toolbar
            var toolbar = new Gtk.Toolbar ();
            toolbar.get_style_context ().add_class ("primary-toolbar");
            
            // AppMenu
            var menu = new Gtk.Menu ();
            var app_menu = (this.app as Granite.Application).create_appmenu (menu);
            
            // Populate the toolbar
            var item = new Gtk.ToolItem ();
            item.set_expand (true);
            
            toolbar.add (item);
            toolbar.add (app_menu);
            
            // Create a new Welcome widget
            var welcome = new Granite.Widgets.Welcome ("Welcome to <%= _.capitalize(appName) %>", "Let's start hacking with it!");
            
            // Add everything to window
            box.pack_start (toolbar, false, true, 0);
            box.pack_start (welcome, true, true, 0);
            
            this.add (box);
        }
    }
}