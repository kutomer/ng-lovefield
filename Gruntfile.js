/**
@toc
2. load grunt plugins
3. init
4. setup variables
5. grunt.initConfig
6. register grunt tasks

*/

'use strict';

module.exports = function (grunt) {

	/**
	Load grunt plugins
	@toc 2.
	*/
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-clean');

	/**
	Function that wraps everything to allow dynamically setting/changing grunt options and config later by grunt task. This init function is called once immediately (for using the default grunt options, config, and setup) and then may be called again AFTER updating grunt (command line) options.
	@toc 3.
	@method init
	*/
    function init(params) {
		/**
		Project configuration.
		@toc 5.
		*/
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            connect: {
                server: {
                    options: {
                        port: 8080,
                        base: './'
                    }
                }
            },
            typescript: {
                base: {
                    src: ['lib/*.ts'],
                    dest: 'dest/ng-lovefield.js',
                    options: {
                        module: 'amd',
                        target: 'es5'
                    }
                }
            },
            clean: {
                js: ['dest/*.js', 'lib/*.js', '!dest/*.min.js']
            },

            watch: {
                files: 'lib/*.ts',
                tasks: ['typescript', 'uglify:build']
            },

            open: {
                dev: {
                    path: 'http://localhost:8080/index.html'
                }
            },

            concat: {
                devCss: {
                    src: [],
                    dest: []
                }
            },

            jshint: {
                options: {
                    //force:          true,
                    globalstrict: true,
                    //sub:            true,
                    node: true,
                    loopfunc: true,
                    browser: true,
                    devel: true,
                    globals: {
                        angular: false,
                        $: false,
                        moment: false,
                        Pikaday: false,
                        module: false,
                        forge: false
                    }
                },
                //quick version - will not fail entire grunt process if there are lint errors
                beforeconcatQ: {
                    options: {
                        force: true,
                        ignores: ['**.min.js']
                    },
                    files: {
                        src: ['**.js']
                    }
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                build: {
                    files: {},
                    src: 'dest/ng-lovefield.js',
                    dest: 'dest/ng-lovefield.min.js'
                }
            }
        });

        grunt.registerTask('default', ['jshint:beforeconcatQ', 'typescript', 'uglify:build', 'clean','connect', 'open', 'watch']);
    }
    init({});		//initialize here for defaults (init may be called again later within a task)

};