'use strict';
module.exports = function(grunt){
    // Unified Watch Object
    var watchFiles = {
        serverViews: ['app/views/**/*.*'],
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', '!app/tests/**/*.js'],
        mochaTests: ['app/tests/**/*.js']
    };
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: watchFiles.serverJS,
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true,
                limit: 10
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            },
            secure: {
                NODE_ENV: 'secure'
            }
        },
        mochaTest: {
            src: watchFiles.mochaTests,
            options: {
                reporter: 'spec',
                require: 'server.js'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });
    // Load NPM tasks
    require('load-grunt-tasks')(grunt);
    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);
    // Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);
    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);
    // Secure task(s).
    grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);
    // Lint task(s).
    grunt.registerTask('lint', ['jshint']);
    // Build task(s).
    grunt.registerTask('build', ['lint']);
    // Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};