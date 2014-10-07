
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			modules: {
				src: [
					'src/modules/*.js',
					'src/modules/**/*.js'
				],
				dest: 'src/modules.js'
			}
		},
		'string-replace': {
			insertModules: {
				files: {
					'carbon.js': 'src/carbon.js'
				},
				options: {
					replacements: [{
						pattern: /\/\/#include\("(.*?)"\)/ig,
						replacement: function(match, file) {
							return grunt.file.read('src/' + file);
						}
					}]
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', [
		'concat:modules',
		'string-replace:insertModules'
	]);

};