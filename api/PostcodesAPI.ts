import LongLat from "../lib/LongLat";

const baseUrl = 'https://api.postcodes.io/postcodes/';

export async function getLongLatFromPostcode(postcode: string) {
    const response = await getPostcodeResponse(postcode);
    if (!response) return;
    return response.result;
}

const getPostcodeResponse = async (postcode: string): Promise<PostcodeResponseDTO | null> => {
    return await fetch(`${baseUrl}${postcode}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.error(error);
        return null;
    })
}

export async function getPostcodeSuggestions(partial: string) {
    return (await getPostcodeAutocompleteResponse(partial))?.result;
}

const getPostcodeAutocompleteResponse = async (partial: string) : Promise<PostcodeAutocompleteResponseDTO | null> => {
    return await fetch(`${baseUrl}${partial}/autocomplete`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.error(error);
        return null;
    })
}

export const isValidPostcode = async (postcode: string) : Promise<boolean> => {
    return await fetch(`${baseUrl}${postcode}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.ok;
    }).catch(error => {
        console.error(error);
        return false;
    })
}

interface PostcodeAutocompleteResponseDTO {
    result: string[]
}

interface PostcodeResponseDTO {
    result: LongLat
}