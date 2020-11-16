import { filesConfig } from './lib/utils';

let fc = new filesConfig('./files.json');
fc.createFiles();
fc.createWebpackConfig();