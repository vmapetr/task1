import { IFiles } from './project-configuration';

const fs = require('fs');
const path = require('path');

export class filesConfig {
    data:                   IFiles;
    entryFile:              string;
    webpackTemplatePath:    string;

    constructor(configPath: string) {
        let rawdata = fs.readFileSync(configPath);

        this.data = JSON.parse(rawdata);
        this.webpackTemplatePath = "./src/lib/webpack-template.json";

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

        let value = "module.exports = " + this.getModuleExportsConfig();

        fs.writeFileSync(filePath, value);
        
        console.info(`Done`)
    }

    private getModuleExportsConfig() {
        let rawdata = fs.readFileSync(this.webpackTemplatePath);
        let data = JSON.parse(rawdata);

        data.entry = path.resolve(this.data.destination, this.entryFile)
        data.output.path = path.resolve(this.data.destination, 'dist')
        data.output.filename = this.data.bundleName
        
        return JSON.stringify(data)
    }

    private validateConfig() { 
        console.debug(`Validating files structure...`);

        if (!this.data.hasOwnProperty('destination')) {
            throw new Error(`Config file missing 'destination' field`)
        }

        this.data.files.forEach(element => {
            if (!element.hasOwnProperty('file')) {
                throw new Error(`File element ${element} missing 'file' field`)
            }

            if (element.hasOwnProperty('entry')) {
                this.entryFile = element.file;
            }
        });

        console.debug(`Done`);
    }
}