import {getAllCityPaths, getCityData} from "../../lib/cities";
import React from "react";
import Head from "next/head";
import {Box} from "@mui/system";
import ResultsTable from "../../components/ResultsTable";
import Search from "../../components/Search";
import {Typography} from "@mui/material";

export default function City({cityData}:any) {
    return <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Best Driving Test Pass Rates Near {cityData.name}</title>
            <meta name="description" content={`Shows the latest pass rates for driving test centres near ${cityData.name} within a 10 mile radius`}/>
            <link rel="canonical" href={`https://drivingpassrate.co.uk/pass-rates/${cityData.name}`}/>
        </Head>
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 1, mb: 1}}>
            <Search initialPostcode={cityData?.postcode} initialRadius={10}/>
        </Box>

        <Typography variant="h6" >Test Centres within 10 mile radius of {cityData.name}</Typography>

        <ResultsTable results={cityData.testCentres}/>
    </>;
}

export async function getStaticPaths() {
    const paths = getAllCityPaths();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }:any) {
    const cityData = getCityData(params.id);
    return {
        props: {
            cityData
        }
    }
}