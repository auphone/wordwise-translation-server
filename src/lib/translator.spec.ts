import { expect } from "chai";
import { Translator } from "./translator";

describe("test translator", () => {
    it("filterDifficultWords()", () => {
        const words = ["apple", "cappuccino"];
        const difficultWords = Translator.filterDifficultWords(words);
        return expect(difficultWords.length).eq(1);
    });
    it("cappuccino is level 3", () => {
        const result = Translator.isDifficult("cappuccino", 3);
        return expect(result).true;
    });
    it("translate cappuccino should not be empty", async () => {
        const result = await Translator.translate("cappuccino");
        return expect(result).not.empty;
    });
    it("bulk translate should return multi result", async () => {
        const result = await Translator.bulkTranslate(["apple", "cappuccino"]);
        return expect(Object.keys(result)).not.empty;
    });
});
