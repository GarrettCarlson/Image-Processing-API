"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const newImageName_1 = __importDefault(require("./newImageName"));
const fullDir = './api/full/';
const resizeImage = async (fileName, newHeight, newWidth) => {
    const newFileName = (0, newImageName_1.default)(fileName, newHeight, newWidth);
    const newFileDir = './api/thumb/';
    try {
        await (0, sharp_1.default)(fullDir + fileName)
            .resize({
            width: newWidth,
            height: newHeight,
        })
            .toFile(newFileDir + newFileName);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
exports.default = resizeImage;
