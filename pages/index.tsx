import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {Button, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Search from "../components/Search";
import Link from "next/link";

const Home: NextPage = () => {

    return (
        <div className={styles.content}>
            <div style={{display: 'flex'}}>
                <Typography variant="h2" sx={{m: 1, fontWeight: 'bold'}}>Find The Best <span
                    style={{color: 'green'}}>Pass Rates</span> Near You <br/>🚗✅</Typography>
            </div>
            <Search initialPostcode={''} initialRadius={10}/>
            <Box sx={{m: 2, mt: 1.8, display: 'flex', flexDirection: 'column'}}>
                <Link href={`/cities`} passHref style={{textDecoration: 'none', color: 'inherit'}}>
                    <Button sx={{alignSelf: 'center'}} variant="outlined">See all cities</Button>
                </Link>
            </Box>
        </div>
    )
}

export default Home
