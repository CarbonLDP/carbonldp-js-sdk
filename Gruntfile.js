
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			debugAuthJavascripts: {
				src: [
					'src/scripts/auth/app.start.js',
					'src/scripts/auth/routes/**/*.js',
					'src/scripts/auth/models/**/*.js',
					'src/scripts/auth/controllers/**/*.js',
					'src/scripts/auth/helpers/**/*.js',
					'src/scripts/auth/components/**/*.js',
					'src/scripts/auth/views/**/*.js',
					'src/scripts/auth/app.end.js'
				],
				dest: 'www/scripts/carbon.auth.js'
			},
			debugAuthTemplates: {
				src: [
					'src/views/auth.header.handlebars',
					'src/views/auth.templates/**/*.handlebars',
					'src/views/common.templates/**/*.handlebars',
					'src/views/auth.footer.handlebars'
				],
				dest: 'www/auth.html'
			},
			debugAdminTemplates: {
				src: [
					'src/views/admin.header.handlebars',
					'src/views/admin.templates/**/*.handlebars',
					'src/views/common.templates/**/*.handlebars',
					'src/views/admin.footer.handlebars'
				],
				dest: 'www/admin.html'
			},
			debugAppsTemplates: {
				src: [
					'src/views/apps.header.handlebars',
					'src/views/apps.templates/**/*.handlebars',
					'src/views/common.templates/**/*.handlebars',
					'src/views/apps.footer.handlebars'
				],
				dest: 'www/apps.html'
			}
		},
		sass: {
			debug: {
				options: {
					style: 'expanded'
				},
				files: [{
					src: [
						'src/sass/carbon.gui.scss'
					],
					dest: 'www/styles/carbon.gui.css'
				}]
			}
		},
		watch: {
			debug: {
				files: [
					'src/**/*.js',
					'src/**/*.scss',
					'src/**/*.html',
					'src/**/*.handlebars'
				],
				tasks: [
					'concat:debugJavascripts',
					'concat:debugAuthTemplates',
					'concat:debugAdminTemplates',
					'concat:debugAppsTemplates',
					'sass:debug'
				]
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'concat:debugAuthJavascripts',
		'concat:debugAuthTemplates',
		'concat:debugAdminTemplates',
		'concat:debugAppsTemplates',
		'sass:debug'
	]);

};