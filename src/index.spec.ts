// tslint:disable-next-line:no-var-requires
const config = require("../config");

import { expect } from "chai";
import rp from "request-promise";

describe("start server", () => {
    const url = `http://localhost:${config.server.port}`;
    it("should run without error", () => {
        require("./index");
        return expect(true).true;
    });
    it("GET: /api/levels should return level", async () => {
        const res = await rp.get(`${url}/api/levels`);
        return expect(JSON.parse(res).level).gt(0);
    });
    it("POST: /api/translate should block with wrong password", async () => {
        const options = {
            body: {
                password: "123",
                words: ["apple"],
            },
            json: true,
            method: "POST",
            uri: `${url}/api/translate`,
        };
        try {
            const res = await rp(options);
            return expect(true).false;
        } catch (err) {
            return expect(true).true;
        }
    });
    it("POST: /api/translate should pass with correct password", async () => {
        const options = {
            body: {
                password: config.password,
                words: ["apple"],
            },
            json: true,
            method: "POST",
            uri: `${url}/api/translate`,
        };
        try {
            const res = await rp(options);
            return expect(true).true;
        } catch (err) {
            return expect(true).false;
        }
    });
});
