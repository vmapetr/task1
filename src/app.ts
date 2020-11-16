import { filesConfig } from './lib/utils';

let fc = new filesConfig('./src/files.json');
fc.createFiles();
fc.createWebpackConfig();