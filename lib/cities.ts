import fs from 'fs';
import path from 'path';

const citiesDirectory = path.join(process.cwd(), 'cities');

export function getAllCityIds() {
    const fileNames = fs.readdirSync(citiesDirectory);

    return fileNames.map((fileName) => {
        return fileName.replace(/\.json$/, '');
    });
}

export function getAllCityPaths() {
    const fileNames = fs.readdirSync(citiesDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.json$/, ''),
            },
        };
    });
}

export function getCityData(id: string) {
    const fullPath = path.join(citiesDirectory, `${id}.json`);
    const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    // Combine the data with the id
    return {
        id,
        ...fileContents,
    };
}