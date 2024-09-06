import React from 'react'
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
const useStyle = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'black'
    },
    link: {
        textDecoration: 'none',
        padding: '20px'
    },
    title: {
        cursor: 'pointer',
        color: 'white'
    }
}))


export default function AppNavigator() {

    const classes = useStyle()

    return (
        <AppBar className={classes.appBar} position = "fixed">
            <Toolbar>
                <Link to="/" className={classes.link}>
                    <Typography className={classes.title}>Pokedex</Typography>
                </Link>
                <Link to="/MyPokemon/" className={classes.link}>
                    <Typography className={classes.title}>My Pokemon</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}