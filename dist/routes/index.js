"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resizer_1 = __importDefault(require("../utils/resizer"));
const routes = express_1.default.Router();
routes.use(express_1.default.static('api'));
routes.get('/images', resizer_1.default, (req, res) => {
    console.log('Main api route was used');
});
exports.default = routes;
