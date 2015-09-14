({
	baseUrl: '.',
	name   : 'bower_components/',
	include: [ 'main' ],
	out    : 'lib-built.js',
	wrap   : {
		startFile: 'path/to/start.frag',
		endFile  : 'path/to/end.frag'
	}
})