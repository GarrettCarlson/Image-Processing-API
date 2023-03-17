"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genFileName = (fileName, height, width) => {
    // remove file extension from the current filename
    const fileNameNoExt = fileName.split('.')[0];
    const fileExt = fileName.split('.')[1];
    const newFilename = fileNameNoExt + '_' + height + '_' + width + '.' + fileExt;
    return newFilename;
};
exports.default = genFileName;
