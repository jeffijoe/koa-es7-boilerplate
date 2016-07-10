import appModulePath from 'app-module-path';

// Basically makes us able to "import stuff from 'some/source/folder'"
appModulePath.addPath(__dirname + '/../');