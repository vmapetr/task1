# TestApp

//TODO

### Requirements
- npm
- PowerShell or PowerShellCore

### How to use

To prepare environment use following script to install required dependencies and create `node_module` folder
```
ps> .\prepareEnvironment.ps1
```
To generate JS Bundle from `./files.json` config use following command
```
ps> gulp run
```
Or use npm build script
```
ps> npm run build
```
To purge generated bundle use clean command

```
ps> gulp clean
```