module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        src : ["src/**/*.js"],

        uglify : {
            options : {
                banner : "/*! <%= pkg.title %> v<%= pkg.version %> | build date : <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                mangle : true
            },

            min : {
                options : {
                    compress : true,
                    beautify : false,
                    compress : {
                        drop_console : true
                    }
                },
                files : {
                    "dist/<%= pkg.name %>.min.js" : "<%= src %>"
                }
            },

            default : {
                options : {
                    mangle   : false,
                    compress : false,
                    beautify : true
                },
                files : {
                    "dist/<%= pkg.name %>.js" : "<%= src %>"
                }
            }
        },

        yuidoc : {
            compile : {
                name        : "<%= pkg.name %>",
                description : "<%= pkg.description %>",
                version     : "<%= pkg.version %>",
                url         : "<%= pkg.homepage %>",
                options     : {
                    paths : [
                        "src/"
                    ],
                    outdir : "dist/docs/"
                }
            }
        },

        bump : {
            options : {
                files:         ['package.json', 'bower.json'],
                updateConfigs: ['pkg']
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-yuidoc");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-bump");

    // Default task(s).
    grunt.registerTask("default", ["uglify", "yuidoc"]);

    grunt.registerTask("patch", ["bump:patch", "uglify", "yuidoc"]);
    grunt.registerTask("minor", ["bump:minor", "uglify", "yuidoc"]);
    grunt.registerTask("major", ["bump:major", "uglify", "yuidoc"]);
};