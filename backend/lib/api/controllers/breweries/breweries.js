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
const breweries_1 = require("../../services/breweries/breweries");
const router = module.exports = express.Router();
const breweryService = new breweries_1.BreweryService();
/**Get all by state */
router.get('/state/:state', (req, res) => {
    const state = req.params.state;
    breweryService.getByState(state)
        .then(data => {
        res.status(200).json(data);
    })
        .catch(err => {
        res.status(500).json(err);
    });
});
/**Get all by city */
router.get('/city/:city', (req, res) => {
    const city = req.params.city;
    breweryService.getByCity(city)
        .then(data => {
        res.status(200).json(data);
    })
        .catch(err => {
        res.status(500).json(err);
    });
});
/**Get brewery by name */
router.get('/name/:name', (req, res) => {
    const name = req.params.name;
    breweryService.getByName(name)
        .then(data => {
        res.status(200).json(data);
    })
        .catch(err => {
        res.status(500).json(err);
    });
});
/**Get brewery by tag I.E. "patio" */
router.get('/tag/:tag', (req, res) => {
    const tag = req.params.tag;
    breweryService.getByTag(tag)
        .then(data => {
        res.status(200).json(data);
    })
        .catch(err => {
        res.status(500).json(err);
    });
});
