// tslint:disable-next-line:no-var-requires
const config = require("../config.json");

import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { Translator } from "./lib/translator";

const app = express();
app.use(json());
app.use(urlencoded({ limit: "5mb" }));
app.use(cors());

// Middleware
function auth(req: Request, res: Response, next: NextFunction) {
    if (!config.password || req.body.password === config.password) {
        return next();
    }
    res.sendStatus(401);
    res.end();
}

// Routes
app.get("/api/levels", (req, res) => {
    res.send({ level: Translator.getLevels() });
});

app.post("/api/translate", auth, async (req, res) => {
    try {
        const { words, lang, level } = req.body;
        const difficultWords = Translator.filterDifficultWords(words, level);
        const translation = await Translator.bulkTranslate(difficultWords, lang);
        res.send(translation);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(config.server.port || 4000, () => console.log("server started"));
