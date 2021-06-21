import { createMuiTheme } from '@material-ui/core/styles'
import React, { useState } from 'react';

// const darkPurple = '#101020';
// const containerColor = '#16162E';
// const purplePrimary = '#3E1CB8';

const darkState = true;
// export default function Dashboard() {
// const [darkState, setDarkState] = useState(false)
const palletType = darkState ? 'dark' : 'light'
const mainPrimaryColor = darkState ? '#2E2E98' : '#2E2E98'
const darkPaper = darkState ? '#101020' : '#FFFFFF'
const containerColor = darkState ? '#16162E' : '#EEEEEE'
const carContainer = darkState ? '#191929' : '#191929'

export default createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: mainPrimaryColor
        },
        background: {
            paper: darkPaper
        },
        container: {
            color: containerColor
        },
        carContainer: {
            color: carContainer
        }
    },
    overrides: {
        MuiTextField: {
            root: {
                borderRadius: '8px',
                backgroundColor: "#3F3D4A",
            },
        },
    },
    shape: {
        borderRadius: '8px'
    },

    typography: {
        body1: {
            fontFamily: 'Roboto',
            textTransform: 'none',
            fontWeight: '400',
            fontSize: '1.2rem',
            color: '#BABABA',
        },
        body2: {
            fontFamily: 'Inter',
            textTransform: 'none',
            fontWeight: '400',
            fontSize: '1.2rem',
            lineHeight: '24px',
        },
    }
})

