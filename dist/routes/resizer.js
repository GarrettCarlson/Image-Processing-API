"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkFile_1 = __importDefault(require("../utils/checkFile"));
const newImageName_1 = __importDefault(require("../utils/newImageName"));
const resizeImage_1 = __importDefault(require("../utils/resizeImage"));
const path_1 = __importDefault(require("path"));
const fullSizeImagePath = path_1.default.resolve('./api/full') + '\\';
const resizedImagePath = path_1.default.resolve('./api/thumb') + '\\';
const resizer = (req, res, next) => {
    console.log(fullSizeImagePath, resizedImagePath);
    // handle image resizing functions
    const originalFileName = req.query.filename;
    const height = parseInt(req.query.height);
    const width = parseInt(req.query.width);
    // check if the file requested exists on the server
    const fileExist = (0, checkFile_1.default)(originalFileName, fullSizeImagePath);
    // check if the file has already been resized to the requested dimensions
    const resizedFileName = (0, newImageName_1.default)(originalFileName, height, width);
    const newFileExist = (0, checkFile_1.default)(resizedFileName, resizedImagePath);
    // Send error if the file does not exist
    if (!fileExist) {
        res.send(`Error: Image requested ${originalFileName} does not exist.`);
    }
    // display the resized image if it has already been created
    else if (newFileExist) {
        console.log(resizedFileName + ' was already on the server.');
        res.send(`<img src="/api/thumb/${resizedFileName}">`);
    }
    // otherwise, try to resize the image
    else {
        console.log('Attempting to resize ' + originalFileName + '...');
        (0, resizeImage_1.default)(originalFileName, height, width)
            .then(() => {
            // display the new image if there are no errors...
            res.send(`<img src="/api/thumb/${resizedFileName}">`);
        })
            .catch((err) => {
            // and pass the error back if there is a problem resizing the file
            res.send(`Error processing ${originalFileName}: ${err}`);
        });
    }
    next();
};
exports.default = resizer;
