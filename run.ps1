################################################################################
##  File:  prepareEnv.ps1
##  Desc:  Prepares environment by purging node_modules folder 
##         and installing required npm dependencies
################################################################################

$nodeModulesFolder = Join-Path -Path $PSScriptRoot -ChildPath "node_modules"

if (Test-Path -Path $nodeModulesFolder) {
    Write-Host "Prugre ${nodeModulesFolder} folder..."
    Remove-Item -Path $nodeModulesFolder -Recurse -Force
}

Write-Host "Installing dependencies..."
Invoke-Expression "npm install"