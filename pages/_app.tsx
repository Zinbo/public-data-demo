import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Container, createTheme, ThemeProvider} from "@mui/material";
import Head from "next/head";
import Box from "@mui/material/Box";

const theme = createTheme({
    typography: {
        fontFamily: [
            "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"
        ].join(",")
    },
    palette: {
        primary: {
            light: '#6985ff',
            main: '#008000',
            dark: '#0031c3',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#9fcfff',
            main: '#689eff',
            dark: '#2770cb',
            contrastText: '#ffffff',
        },
    },
});

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <title>Best Driving Test Pass Rates Near Me</title>
            <meta name="description"
                  content="Give yourself the best opportunity to pass your driving test. Find the driving test centre that has the best pass rate near you. Find in locations such as Manchester, London, Birmingham, Newcastle, Leeds, Wales, Scotland, anywhere in the UK."/>
            <meta name='application-name' content='Best Driving Test Pass Rates Near Me' />
            <link rel="icon" href="/favicon.ico"/>

            {/* iOS */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="PWA App" />
            <meta name="format-detection" content="telephone=no" />

            {/* Android */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#008000" />

            <link rel="manifest" href="/manifest.json" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://public-data-demo.vercel.app" />
            <meta name="twitter:title" content="Best Driving Test Pass Rates Near Me" />
            <meta name="twitter:description" content="Give yourself the best opportunity to pass your driving test. Find the driving test centre that has the best pass rate near you. Find in locations such as Manchester, London, Birmingham, Newcastle, Leeds, Wales, Scotland, anywhere in the UK." />
            <meta name="twitter:image" content="https://public-data-demo.vercel.app/icon-512x512.png" />
            <meta name="twitter:creator" content="@shanepjennings" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content="Best Driving Test Pass Rates Near Me" />
            <meta property="og:description" content="Give yourself the best opportunity to pass your driving test. Find the driving test centre that has the best pass rate near you. Find in locations such as Manchester, London, Birmingham, Newcastle, Leeds, Wales, Scotland, anywhere in the UK." />
            <meta property="og:url" content="https://public-data-demo.vercel.app" />
            <meta property="og:image" content="https://public-data-demo.vercel.app/icon-512x512.png" />

        </Head>
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Container fixed sx={{display: 'flex', flex: 1, flexDirection: 'column'}}>
                    <Component {...pageProps} />
                </Container>
            </Box>
        </ThemeProvider>
    </>
}

export default MyApp
