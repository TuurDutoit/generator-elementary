include (Translations)
add_translations_directory (<%= _.capitalize(appName) %>)
add_translations_catalog (<%= _.capitalize(appName) %>
    ../src
)