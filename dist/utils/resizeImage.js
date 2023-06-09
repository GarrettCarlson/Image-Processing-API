"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const newImageName_1 = __importDefault(require("./newImageName"));
const fs_1 = __importDefault(require("fs"));
const fullDir = './api/full/';
const resizeImage = (fileName, newHeight, newWidth) => __awaiter(void 0, void 0, void 0, function* () {
    const newFileName = (0, newImageName_1.default)(fileName, newHeight, newWidth);
    const newFileDir = './api/thumb/';
    try {
        if (!fs_1.default.existsSync(newFileDir)) {
            fs_1.default.mkdirSync(newFileDir);
        }
        yield (0, sharp_1.default)(fullDir + fileName)
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
});
exports.default = resizeImage;
