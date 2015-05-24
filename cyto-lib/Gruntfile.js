module.exports = function(grunt) {

  /**
  *
  * GRUNT TASKS
  *
  */
 
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
    *
    * BOWER
    *
    */

    bower: {

      dist: {
        dest:      'dist/',
        js_dest:   'dist/scripts/libs',
        css_dest:  'dist/styles'
      },

      sandbox: {
        dest:      'src/sandbox/_shared/libs/',
        js_dest:   'src/sandbox/_shared/libs/scripts',
        css_dest:  'src/sandbox/_shared/libs/styles',
        fonts_dest : 'src/sandbox/_shared/libs/fonts',
      },

    },

    /**
    *
    * CLEAN
    *
    */

    clean: {
      dist: 'dist/*' //deletes files in dist/webapp dir 
    },

    concat: {
      scripts: {
        options: {
          separator: '\n;',

          //BANNER FOR MASTER JS BUILD
          banner: '/**\n * \n * ' +
                  '<%= pkg.title || pkg.name %> - v<%= pkg.version %> '  +
                  '<%= grunt.template.today("yyyy.mm.dd") %>\n * \n'     +
                  '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %>' +
                  '<%= pkg.author ? " - " + pkg.author + "\\n" : "" %>'  +
                  ' *\n */\n\n'
        },
        src: [
          'dist/scripts/chapters/*',
          'dist/scripts/classes/*',
          'dist/scripts/core/*'
        ],
        dest: 'dist/build.js'
      },
      styles: {
        options: {
          separator: '\n;',

          //BANNER FOR MASTER CSS BUILD
          banner: '/**\n * \n * ' +
                  '<%= pkg.title || pkg.name %> - v<%= pkg.version %> '  +
                  '<%= grunt.template.today("yyyy.mm.dd") %>\n * \n'     +
                  '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %>' +
                  '<%= pkg.author ? " - " + pkg.author + "\\n" : "" %>'  +
                  ' *\n */\n\n'
        },
        src: [ //these need to be in order
          'dist/styles/normalize.css',
          'dist/styles/bootstrap.css',
          'dist/styles/main.css',
          'dist/styles/index.css'
        ],
        dest: 'dist/all.css'
      }
    },
    
    /**
    *
    * CONNECT
    *
    */

    connect: {
      dev: {
        options: {
          port: 9001,
          base: '.',
          keepalive: true,
          hostname : '*'
        }
      }
    },

    /**
    *
    * COPY
    *
    */

    copy: {
      source: { 
        files: [
          {
          expand: true, 
          cwd: 'src/',
          src: [ 
            '*/**'
          ], // include or exclude files to copy
          dest: 'dist/'
          }
        ]
      },
      scripts: {
        files: [
          {
          expand: true, 
          cwd: 'dist/',
          src: ['build.js', 'build.min.js'],
          dest: 'dist/scripts'
          }
        ]
      },
      styles: {
        files: [
          {
          expand: true, 
          cwd: 'dist/',
          src: ['all.css', 'all.min.css'],
          dest: 'dist/styles'
          }
        ]
      },
      sandbox: {
        files: [
          {
          expand: true, 
          cwd: 'src/sandbox/sandbox-template/',
          src: ['**'],
          dest: 'src/sandbox/<%= sandboxSketchTitle %>/'
          }
        ]
      },
    },

    /**
    *
    * CSS MIN
    *
    */

    cssmin: {
      dist: {
        options: {
          banner: '/**\n * \n * ' +
                  '<%= pkg.title || pkg.name %> - v<%= pkg.version %> '  +
                  '<%= grunt.template.today("yyyy.mm.dd") %>\n * \n'     +
                  '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %>' +
                  '<%= pkg.author ? " - " + pkg.author + "\\n" : "" %>'  +
                  ' *\n */\n\n'
          },
          files: {
          'dist/all.min.css': ['dist/all.css']
          }
      }
    },

    curl: {

      'db-design-view-bkup': {
        src:  'http://localhost:5984/node_auth/_design/users',
        dest: 'src/cyto-db/design-views/users.json'
      },

      'upload': {
          src: [{
            url: 'http://localhost:3333/cyto-db/design-views/users.json',
            method: 'PUT'
          }],
          dest: 'http://localhost:5984/cytodb/_design/'
        }
      
    },

    /**
    *
    * EXEC
    *
    */

    exec: {

      editSketch: {
        cmd: function(file) {
          return 'subl ./src/sketches/' + file;
        }
      },

      editClass: {
        cmd: function(file) {
          return 'subl ./src/cyto-core/' + file;
        }
      },

      //startServer: 'grunt connect &',
      startServer: 'grunt open & node ./src/start.js',

      loadCyto: {

        stdout: true,
        stderr: true,

        cmd: function(cytoToLoad) {
          return '"/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome" --load-and-launch-app=./src/Cyto001/ChromeApp'
          //return String("open ./src/Cyto" + cytoToLoad + "/cyto.app");
        }
      }
    },

    /**
    *
    * JSHINT
    *
    */

    jshint: {
      all: ['Gruntfile.js', 'src/**'],
      options: {
        '-W002': true //supress warning about IE8 by listing warning number from console output
      }
    },

    /**
    *
    * OPEN
    *
    */

    open: {
      src: {
        path: 'http:localhost:3333/sketch'
      }
    },

    /**
    *
    * PROCESS HTML
    *
    */

    processhtml: {
      all: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },

    /**
    *
    * REMOVE
    *
    */

    remove: {
      options: {
        trace: true
      },
      scripts: {
        dirList: ['dist/scripts'],
      },
      styles: {
        dirList: ['dist/styles'],
      },
      cleanup: {
        fileList: [
          'dist/build.js',
          'dist/build.min.js',
          'dist/all.css',
          'dist/all.min.css',
          'dist/styles/normalize-css.css',
          'dist/styles/bootstrap.css'
        ]
      }
    },

    /**
    *
    * UGLIFY
    *
    */

    uglify: {
      scripts: {
        files: {
          'dist/build.min.js': ['dist/build.js']
        }
      }
    },

    /**
    *
    * WATCH
    *
    */

    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['src/**'],
        tasks: [ /*setup tasks to run on watch */ ]
      },
      docs: {
        files: ['src/**'],
        tasks: [ /* tasks to run on watch */ ]
      }
    },

    /**
    *
    * YUIDOC
    *
    */

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          themedir: 'docs/yuidoc-theme/cyto', 
          paths: 'src/',
          outdir: 'docs/'
        }
      }
    }

  });

   /**
    *
    * Load NPM Modules
    *
    */

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-remove');


  /*
   * Registered Grunt Tasks
   */

  //development and distribution tasks
  grunt.registerTask('build-sandbox', ['bower:sandbox']);

  //build task
  grunt.registerTask('default', ['exec:startServer']);

  //TESTING CONFIG

  grunt.registerTask('tmp', 'Generates a new canvas sketch.', function() {
    var configJS = grunt.file.read('src/config.js');
    var config = eval(configJS);
    console.log(config());
  });



  /*
   *
   * GRUNT CLASS
   *
   *  - generate a new cyto sketch
   */

  grunt.registerTask('class', 'Generates a new cyto class.', function() {
    var classList = grunt.file.readJSON('src/classes.json')
      , inc        = 0
      , alpha      = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      , newClass   = 'Class-' + grunt.template.today("yyyy-mm-dd");

    newClass += '-' + alpha[inc] + '.js';

    classList.push({
      'title'  : grunt.template.today("yyyy-mm-dd") + '-' + alpha[inc],
      'src'    : newClass,
      'default': 'true'
    });

    grunt.log.writeln("generating new canvas sketch");
    grunt.file.copy('src/cyto-templates/basic-class-amd.js', 'src/cyto-core/' + newClass);
    grunt.file.write('src/classes.json', JSON.stringify(classList, null, 2));

    grunt.task.run('exec:editClass:' + newClass);
  });

  /**
   *
   * GRUNT SANDBOX
   *
   * Generates a new sandbox project template
   *
   * @arg title {String} - The title of the sandbox sketch
   * @cmd grunt sandbox 'sandbox-sketch-title'
   */

  grunt.registerTask('sandbox', 'Creates a new sandbox project', function(title) {
    if(!title) {
      console.log('sandbox task requires a title');
      return;
    }
    grunt.config.set('sandboxSketchTitle', title);
    grunt.task.run('copy:sandbox');
  });

  /*
   *
   * GRUNT SKETCH
   *
   *  - generate a new cyto sketch
   */

  grunt.registerTask('sketch', 'Generates a new canvas sketch.', function () {
    var sketchList = grunt.file.readJSON('src/sketches.json')
      , inc        = 0
      , alpha      = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      , newSketch  = 'sketch-' + grunt.template.today("yyyy-mm-dd");

    sketchList.forEach(function(sketches) {
      for(var prop in sketches) {
        if(prop === 'default') {
          delete sketches[prop];
        }
        if(prop == 'src' && sketches[prop].search(newSketch) !== -1) {
          while(sketches[prop].search(newSketch + '-' + alpha[inc]) !== -1) {
            inc++;
          }
        }
      }
    });

    newSketch += '-' + alpha[inc] + '.js';

    sketchList.push({
      'title'  : grunt.template.today("yyyy-mm-dd") + '-' + alpha[inc],
      'src'    : newSketch,
      'default': 'true'
    });

    grunt.log.writeln("generating new canvas sketch");
    grunt.file.copy('src/cyto-templates/basic-sketch.js', 'src/sketches/' + newSketch);
    grunt.file.write('src/sketches.json', JSON.stringify(sketchList, null, 2));

    grunt.task.run('exec:editSketch:' + newSketch, 'default');
  });

  /*
   *
   * GRUNT CYTO
   *
   *  - launches a given cyto number
   */

  grunt.registerTask('cyto', 'launches a cyto', function(num) {
    //grunt.task.run('exec:startServer'); //start server at localhost 9001
    grunt.task.run('exec:loadCyto:' + (num || '001'));
  });
};