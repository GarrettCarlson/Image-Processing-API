"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkFile_1 = __importDefault(require("./utils/checkFile"));
const newImageName_1 = __importDefault(require("./utils/newImageName"));
const resizeImage_1 = __importDefault(require("./utils/resizeImage"));
const app = (0, express_1.default)();
const port = 3000;
//app.use(express.static(path.resolve('./api/')));
app.use(express_1.default.static('api'));
// use a route handler to parse the parameters passed for resizing the image
app.get('/api/images', (req, res) => {
    const originalFileName = req.query.filename;
    const height = parseInt(req.query.height);
    const width = parseInt(req.query.width);
    // check if the file requested exists on the server
    const fileExist = (0, checkFile_1.default)(originalFileName, './api/full/');
    // check if the file has already been resized to the requested dimensions
    const resizedFileName = (0, newImageName_1.default)(originalFileName, height, width);
    const newFileExist = (0, checkFile_1.default)(resizedFileName, './api/thumb/');
    // Send error if the file does not exist
    if (!fileExist) {
        res.send(`Error: Image requested ${originalFileName} does not exist.`);
    }
    // display the resized image if it has already been created
    else if (newFileExist) {
        console.log(resizedFileName + ' was already on the server.');
        res.send(`<img src="/thumb/${resizedFileName}">`);
    }
    // otherwise, try to resize the image
    else {
        console.log('Attempting to resize ' + originalFileName + '...');
        (0, resizeImage_1.default)(originalFileName, height, width)
            .then(() => {
            // display the new image if there are no errors...
            res.send(`<img src="/thumb/${resizedFileName}">`);
        })
            .catch((err) => {
            // and pass the error back if there is a problem resizing the file
            res.send(`Error processing ${originalFileName}: ${err}`);
        });
    }
});
// start the express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
