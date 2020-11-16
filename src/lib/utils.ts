import { IFiles } from './project-configuration';

const fs = require('fs');
const path = require('path');

export class filesConfig {
    data: IFiles;

    constructor(configPath: string) {
        let rawdata = fs.readFileSync(configPath);
        this.data = JSON.parse(rawdata);

        this.validateConfig();
    }

    public createFiles() {
        console.info(`Creating file structure...`);

        this.data.files.forEach(element => {
            let filePath = path.resolve(this.data.destination, element.file);
            let dirName = path.dirname(filePath);

            if (!fs.existsSync(dirName)) { fs.mkdirSync(dirName, { recursive: true }) };

            try {
                fs.writeFileSync(filePath, element.content);
                console.info(`The file ${filePath} has been created`);
            } catch {
                throw new Error(`Failed to create ${filePath}`);
            }
        });

        console.info(`Done`);
    }

    public createWebpackConfig() {
        console.info(`Creating webpack config...`);

        let filePath = path.resolve(this.data.destination, 'webpack.config.js');
        let value = "module.exports = " + JSON.stringify(this.getWebpackContent());

        fs.writeFileSync(filePath, value);
        
        console.info(`Done`)
    }

    private getWebpackContent() {
        let webpackContent = module.exports = {
            entry: path.resolve(this.data.destination, this.getWebpackEntry()),
            module: {
              rules: [
                {
                  use: 'ts-loader'
                },
              ],
            },
            resolve: {
              extensions: ['.ts'],
            },
            output: {
              path: path.resolve(this.data.destination, 'dist'),
              filename: this.data.bundleName
            }
          }
        
        return webpackContent
    }

    private getWebpackEntry() {
        let entry : string
        this.data.files.some(element => { if (element.entry) { entry = element.file; } });
        return entry
    }

    private validateConfig() { 
        console.info(`Validating files structure...`);

        if (!this.data.hasOwnProperty('destination')) {
            throw new Error(`Config file missing 'destination' field`)
        }

        this.data.files.forEach(element => {
            if (!element.hasOwnProperty('file')) {
                throw new Error(`File element ${element} missing 'file' field`)
            }
        });

        console.info(`Done`);
    }
}