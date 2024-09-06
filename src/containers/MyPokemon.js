import React, { useContext } from 'react';
import { PokemonContext } from '../components/PokemonContext';
import { Box, Typography, Grid, withStyles, Button } from '@material-ui/core';
import PokemonCard from '../components/PokemonCard';
const styles = (theme) => ({
    container: {
        padding: "70px 10px 0px 10px",
    },
});

function MyPokemon({ classes }) {
    const { caughtPokemon, releasePokemon } = useContext(PokemonContext);
    
    return (
        <Box className={classes.container}>
            <Typography variant="h3" align="center">
                My Pokemon
            </Typography>
            <Grid container spacing={2}>
                {caughtPokemon.length > 0 ? (
                    caughtPokemon.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} image={pokemon.sprites.front_default} key={pokemon.id} clickable={false}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => releasePokemon(pokemon.name)}
                                style={{ marginTop: '10px' }}
                                height='20px'
                                >
                                Release
                            </Button>
                        </PokemonCard>
                    ))
                ) : (
                    <Typography align="center" variant="h5">
                        No Pokemon
                    </Typography>
                )}
            </Grid>
        </Box>
    );
}

export default withStyles(styles)(MyPokemon);
