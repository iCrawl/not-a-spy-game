module.exports = {
	name: 'codenames',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/codenames',
	snapshotSerializers: [
		'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
};
