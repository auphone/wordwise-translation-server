import { createSync, Difficulty } from "difficulty";
import { assignIn, chunk, zipObject } from "lodash";

// tslint:disable-next-line:no-var-requires
const googleTranslate = require("google-translate-api");

const difficulty = createSync();

export class Translator {

    public static filterDifficultWords(words: string[], level = 1): string[] {
        return words.filter((word) => {
            return (word && this.isDifficult(word, level));
        });
    }

    public static getLevels() {
        return difficulty.wordList.length - 1;
    }

    public static isDifficult(word: string, level: number) {
        return difficulty.getLevel(word) >= level;
    }

    public static async translate(word: string, lang = "zh-tw") {
        const { text } = await googleTranslate(word, { to: lang });
        return text;
    }

    public static getChunkedTasks(chunks: string[][], lang = "zh-tw"): any[] {
        const tasks: any[] = [];
        chunks.forEach((chunkedWords) => {
            let str = "";
            chunkedWords.forEach((word) => {
                str += `${word}\n`;
            });
            tasks.push(googleTranslate(str, { to: lang }));
        });
        return tasks;
    }

    public static async bulkTranslate(words: string[], lang = "zh-tw") {
        const chunks = chunk(words, 50);
        const tasks = this.getChunkedTasks(chunks, lang);
        const results = await Promise.all(tasks);
        const translation = {};
        results.forEach((result, idx) => {
            const { text } = result;
            const splittedWords = text.split("\n");
            assignIn(translation, zipObject(chunks[idx], splittedWords));
        });
        return translation;
    }
}
