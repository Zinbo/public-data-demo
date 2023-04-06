import {Box, ListItemButton, ListItemText, Typography} from "@mui/material";
import {getAllCityIds} from "../lib/cities";
import Link from "next/link";
import Head from "next/head";
import React from "react";


export async function getStaticProps() {
    const cityIds = getAllCityIds();
    return {
        props: {
            cityIds,
        },
    };
}

interface CitiesProps {
    cityIds: string[]
}


function capitalizeFirstLetter(string: string) {
    return string.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}


export default function cities({cityIds}: CitiesProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>Best Driving Test Pass Rates Near Me - Pass Rates</title>
                <meta name="description"
                      content={`A list of all the cities in the UK, each linking to the latest pass rates for driving centres in that area.`}/>
            </Head>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h2">Cities</Typography>
                <Box>
                    {cityIds.map(id => {
                        return (
                            <Link href={`/pass-rates/${id}`} passHref key={id} style={{textDecoration: 'none', color: 'inherit'}}>
                                <ListItemButton >
                                    <ListItemText primary={capitalizeFirstLetter(id)}/>
                                </ListItemButton>
                            </Link>)
                    })
                    }
                </Box>
            </Box>
        </>
    )
}

