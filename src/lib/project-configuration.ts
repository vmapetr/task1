import { IFile } from './file-description';

export interface IFiles {
    destination:    string;
    bundleName:     string;
    files:          IFile[];
}