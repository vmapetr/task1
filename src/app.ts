import { filesConfig } from './lib/utils';

let fc = new filesConfig('./files.json');

fc.createFiles();
if (fc.entryFile) {
    fc.createWebpackConfig();
} else {
    throw new Error('files.json missing webpack entry file');
}