import React from 'react'
import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
    card: {
        backgroundColor: 'black',
        color: 'white',
         "&:hover": {
            backgroundColor: "rgb(90,90,90)"
        },
        pointerEvents: (props) => (props.clickable ? 'auto' : 'none'),       
    },
    cardMedia: {
        margin: "auto",
        width: 130,
        height: 130
    },
    cardContent: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none'
    }

}))

export default function PokemonCard(props){
    const { pokemon, image, children, clickable = true } = props
    const classes = useStyle({clickable})
    const { id, name, type } = pokemon
    return(
        <Grid item xs={12} sm={2} key={id}>
        {clickable ? (
            <Link to={"/pokemon/" + id} className={classes.link}>
                <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia} image={image}></CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography>
                            {name}
                        </Typography>
                        <Typography>
                            {type}
                        </Typography>
                        {children}
                    </CardContent>
                </Card>
            </Link>
        ) : (
            <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={image}></CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography>
                        {name}
                    </Typography>
                    <Typography>
                        {type}
                    </Typography>
                    {children}
                </CardContent>
            </Card>
        )}
    </Grid>
    )
}