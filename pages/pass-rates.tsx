import React, {useEffect} from "react";
import {getLongLatFromPostcode} from "../api/PostcodesAPI";
import {TestCentre, TestCentreWithDistance} from "../lib/TestCentre";
import ResultsTable from "../components/ResultsTable";
import {useRouter} from 'next/router'
import Head from "next/head";
import {Typography} from "@mui/material";
import {getTestCentres} from "../lib/testcentres";
import LongLat from "../lib/LongLat";
import {Box} from "@mui/system";
import Search from "../components/Search";

export async function getStaticProps() {
    const testCentres = getTestCentres();
    return {
        props: {
            testCentres
        },
    };
}

function getTestCentresWithinRadius(usersLongLat: LongLat, radius: number, testCentres: TestCentre[]) : TestCentreWithDistance[] {
    return testCentres.flatMap(centre => {
        const distance = getDistanceFromLatLon(usersLongLat.latitude, usersLongLat.longitude, centre.mapDetails.lat, centre.mapDetails.lng);
        if(distance > radius) return [];
        const centreWithDistance = structuredClone(centre) as TestCentreWithDistance;
        centreWithDistance.distance = distance;
        return centreWithDistance;
    })
}

function getDistanceFromLatLon(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c) * 0.62137119; // Distance in km
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

export default function Results({testCentres}:any) {
    const router = useRouter()
    const {postcode, radius} = router.query;
    const [results, setResults] = React.useState<TestCentreWithDistance[]>([]);

    const getResults = async () => {
        if (!postcode) return;
        if (!radius) return;
        const usersLongLat = await getLongLatFromPostcode(postcode as string);
        if (!usersLongLat) return;

        setResults(getTestCentresWithinRadius(usersLongLat, parseInt(radius as string), testCentres));
    }

    useEffect(() => {
        getResults();
    }, [postcode, radius])


    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>Best Driving Test Pass Rates Near Me - Pass Rates</title>
                <meta name="description" content={`Shows the latest pass rates for driving test centres near ${postcode} within a ${radius} mile radius`}/>
            </Head>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 1, mb: 1}}>
                <Search initialPostcode={postcode} initialRadius={radius}/>
            </Box>

            <Typography variant="h6">Test Centres within {radius} mile radius of {postcode}</Typography>

            <ResultsTable results={results}/>
        </>
    );
}