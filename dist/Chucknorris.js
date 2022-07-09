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
const axios_1 = __importDefault(require("axios"));
const express = require('express');
const { json } = require('express/lib/response');
const chuckapi = express();
chuckapi.use(express.json());
const port = 8080;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const categorylist = (yield axios_1.default.get("https://api.chucknorris.io/jokes/categories")).data;
        const random = Math.floor(Math.random() * categorylist.length);
        const jokes = (yield axios_1.default.get("https://api.chucknorris.io/jokes/random?category=" + categorylist[random])).data;
        console.log("Random joke number  from category " + categorylist[random] + ":" + jokes.value.replaceAll("Chuck", "Eduardo").replaceAll("Norris", "Burgos"));
        categorylist.splice(random, 1);
        return jokes;
    });
}
chuckapi.get('/joke', (request, respond) => __awaiter(void 0, void 0, void 0, function* () {
    const valuejoke = yield main();
    respond.send(valuejoke);
}));
chuckapi.listen(port, () => console.log('alterna Api is running!'));
//# sourceMappingURL=Chucknorris.js.map