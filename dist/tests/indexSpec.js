"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resizeImage_1 = __importDefault(require("../utils/resizeImage"));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const image_size_1 = __importDefault(require("image-size"));
const testImageName = 'test.jpg';
const dneImageName = 'nonexistent_image.jpg';
// middleware tests
describe('Image resizer middleware spec', function () {
    // if the image fails to process, an error should be provided to the user
    it("should return an error message if the image fails to resize", async () => {
        await expectAsync((0, resizeImage_1.default)(dneImageName, 100, 100)).toBeRejected();
    });
    // new height/width should match inputs
    it("should resize the image to the given height and width", async () => {
        const newHeight = 500;
        const newWidth = 500;
        const result = await (0, resizeImage_1.default)(testImageName, newHeight, newWidth);
        const newFileName = path_1.default.resolve('./api/thumb/' + testImageName.replace('.jpg', '') + '_500_500.jpg');
        const dimensions = (0, image_size_1.default)(newFileName);
        expect(dimensions.height).toEqual(newHeight);
        expect(dimensions.width).toEqual(newWidth);
    });
});
// endpoint tests
const req = (0, supertest_1.default)(index_1.default);
describe("Endpoint spec", function () {
    it("should open in the browser with status 200", async () => {
        const res = await req.get('/api/images?filename=' + testImageName + '&height=100&width=100');
        expect(res.status).toBe(200);
    });
    it("should provide an error to the user if the image requested does not exist", async () => {
        const response = await req.get('/api/images?filename=' + dneImageName + '&height=100&width=100');
        expect(response.text).toMatch(/(Error: Image requested .* does not exist.)/);
    });
    it("should not resize the image if a cached version exists", async () => {
        // resize the  test image and note its time of creation
        const testGet = '/api/images?filename=' + testImageName + '&height=100&width=100';
        const response = await req.get(testGet);
        const newFileName = testImageName.replace('.jpg', '') + '_100_100.jpg';
        const creationTime = fs_1.default.statSync(path_1.default.resolve('./api/thumb/' + newFileName)).mtime;
        // attempt resizing the image again. If time of creation is the same as before, the image was not resized
        const response2 = await req.get(testGet);
        const creationTime2 = fs_1.default.statSync(path_1.default.resolve('./api/thumb/' + newFileName)).mtime;
        expect(creationTime).toEqual(creationTime2);
    });
});
