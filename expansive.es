/*
    exp.json - Configuration for exp-esp

    Transform by prefixing and minifying.
 */
Expansive.load({
    expansive: {
        transforms: {
            name:   'compile-esp',
            input:  'esp',
            output: 'css',
            script: `
                function transform(contents, meta, service) {
                    let esp = Cmd.locate('esp')
                    if (esp) {
                        contents = runFile(esp + ' compile', contents, meta)
                    } else {
                        trace('Warn', 'Cannot find esp')
                    }
                    return contents
                }
            `
        }
    }
})
