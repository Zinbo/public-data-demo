import * as React from 'react';
import {useCallback, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, {AutocompleteRenderInputParams} from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import debounce from 'lodash/debounce';
import {getPostcodeSuggestions} from "../api/PostcodesAPI";
import {CircularProgress} from "@mui/material";

export const getOptionsAsync = (query: string): Promise<string[]> => {
    if(!query) return Promise.resolve([]);
    return getPostcodeSuggestions(query).then(suggestions => suggestions ? suggestions : []);
};

interface PostcodeAutocompleteProps {
    setPostcode: (s: string | null) => void
    postcodeError: boolean
    setPostcodeError: (b: boolean) => void
    submitForm: () => void
    postcode: string | null
}

export default function PostcodeAutocomplete({
                                                 setPostcode,
                                                 postcodeError,
                                                 setPostcodeError,
                                                 submitForm,
                                                 postcode
                                             }: PostcodeAutocompleteProps,) {
    const [options, setOptions] = React.useState<string[]>([]);
    const [value, setValue] = React.useState<string | null>(postcode);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const getOptionsDelayed = useCallback(
        debounce((query: string, callback: (options: string[]) => void) => {
            setOptions([]);
            getOptionsAsync(query).then(callback);
        }, 300),
        []
    );

    useEffect(() => {
        setValue(postcode);
    }, [postcode])

    useEffect(() => {
        setIsLoading(true);

        getOptionsDelayed(searchQuery, (options: string[]) => {
            setOptions(options);

            setIsLoading(false);
        });
    }, [searchQuery, getOptionsDelayed]);

    const onChange = (event: unknown, value: string | null) => {
        setValue(value);
        setPostcode(value);
        setPostcodeError(false);
    };

    const onInputChange = (event: unknown, value: string) => {
        setSearchQuery(value);
        setPostcode(value);
        setPostcodeError(false);
    };

    const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == 'Enter') {
            submitForm()
        }
    }

    const renderInput = (
        params: AutocompleteRenderInputParams
    ): React.ReactNode => {
        return (
            <TextField {...params} label="Postcode" InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                ),
            }}
                       error={postcodeError}
                       helperText={postcodeError ? "Not a valid postcode" : ""}
                       onKeyDown={keyPress}/>
        );
    };

    return (
        <Autocomplete
            options={options}
            value={value}
            onChange={onChange}
            onInputChange={onInputChange}
            renderInput={renderInput}
            loading={isLoading}
            filterOptions={x => x}
            freeSolo
            sx={{minWidth: 140}}
            renderOption={(props, option) => {

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Box
                                    component={LocationOnIcon}
                                    sx={{color: 'text.secondary', mr: 2}}
                                />
                            </Grid>
                            <Grid item xs>
                                {option}
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}