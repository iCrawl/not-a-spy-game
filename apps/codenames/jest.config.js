module.exports = {
	name: 'codenames',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/codenames',
	snapshotSerializers: [
		'jest-preset-angular/AngularSnapshotSerializer.js',
		'jest-preset-angular/HTMLCommentSerializer.js',
	],
};
