import path from "path";
import fs from "fs";
import {TestCentre} from "./TestCentre";

const directory = path.join(process.cwd(), 'testcentres');

export function getTestCentres() {
    const fullPath = path.join(directory, `testcentres.json`);
    const testCentres : TestCentre[] = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    return testCentres;
}