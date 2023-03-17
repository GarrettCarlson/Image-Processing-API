"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// Check if file exists on server
const fileOnServer = (fileName, dirName) => {
    const fullPath = dirName + fileName;
    //console.log(fullPath);
    return fs_1.default.existsSync(fullPath);
};
exports.default = fileOnServer;
