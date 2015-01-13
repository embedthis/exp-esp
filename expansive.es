/*
    expansive.es - Configuration for exp-esp

    Post process by compiling esp pages, controllers and apps
 */
Expansive.load({
    transforms: [{
        name:   'compile-esp',
        files:  null,
        script: `
            function post(meta, service) {
                let esp = Cmd.locate('esp')
                if (!esp) {
                    trace('Warn', 'Cannot find esp')
                    return
                }
                if (expansive.filters || service.files) {
                    let files = expansive.directories.documents.files(service.files || '**.esp')
                    for each (path in files) {
                        let match = false
                        for each (filter in expansive.filters) {
                            filter = expansive.directories.documents.join(Path(filter).trimComponents(1))
                            if (filter.startsWith(path) || path.startsWith(filter)) {
                                match = true
                                break
                            }
                        }
                        if (match) {
                            run([esp, 'compile', path])
                        }
                    }
                } else {
                    run([esp, 'compile'])
                }
            }
        `
    }, {
        name:       'serve',
        command:    'esp --trace stdout:4',
    }]
})
