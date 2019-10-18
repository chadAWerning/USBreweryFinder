"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const router = module.exports = express.Router();
router.get('/download/:name', (req, res) => {
    const fileName = req.params.name;
    const file = `./${fileName}`;
    res.download(file); // Set disposition and send it.
});
