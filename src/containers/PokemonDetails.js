import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../components/PokemonContext';
import { useParams } from 'react-router-dom';
import { POKEMON_API_URL } from '../config';
import { Box, Button, CircularProgress, Grid, TextField, Typography, withStyles, Dialog, DialogActions, DialogContent, DialogTitle  } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite'

const styles = (theme) => ({
    pokedexContainer: {
        height: "84vh",
        backgroundColor: 'black',
        color: 'white',
        marginTop: 75,
        textAlign: 'center',
        borderRadius: 5,
        paddingTop: 30,
    },
    textTitle: {
        textTransform: "uppercase",
        fontFamily: 'Fantasy',
    },
    pokemonImage: {
        width: "170px",
        height: "170px",
    },
    pokemonInfoContainer: {
        bottom: 60,
        position: 'absolute',
        width: "100%",
    },
    separator: {
        height: '0.01mm',
        width: "95%",
    },
    favorites: {
        height: 50,
        width: 50,
        marginTop: 15
    },
    text: {
        fontSize: 30
    },
    button: {
        marginTop: 15
    }
});

function PokemonDetails({ classes }) {
    const { id } = useParams();
    const { catchPokemon } = useContext(PokemonContext);
    const [pokemon, setPokemon] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [pokemonName, setPokemonName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`${POKEMON_API_URL}/${id}`).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    setPokemon(response.data);
                }
            }).catch((error) => {
                console.error('Error fetching Pokemon:', error);
            });
        }
    }, [id]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        const newPokemon = { ...pokemon, name: pokemonName.trim() };
        const isAdded = catchPokemon(newPokemon);
            if (!isAdded) {
                alert('A Pokemon with this name is already registered.');
            }else {
                alert('A new pokemon added!')
                setOpenDialog(false);
                catchPokemon({ ...pokemon, name: pokemonName.trim() });
                setPokemonName('');
            }

        
    };

    const handleCancelDialog = () => {
        setOpenDialog(false);
    }

    const handleCatch = () => {
        const isCaught = Math.random() < 0.5;
        if (isCaught) {
            handleOpenDialog();
            if (!pokemonName || pokemonName.trim() === '') {
                setError('Name must unique & cannot be empty');
                return;
            }
            

        } else {
            alert(`${pokemon.name} escaped!`);
        }
    };

    if (pokemon) {
        const { sprites, height, weight, types } = pokemon;
        return (
            <Box>
                <Box className={classes.pokedexContainer}>
                    <Typography className={classes.textTitle} variant='h1'>
                        {pokemon.name}
                    </Typography>
                    <img className={classes.pokemonImage} src={sprites.front_default} alt={pokemon.name} />

                    <Box className={classes.pokemonInfoContainer}>
                        <hr className={classes.separator} />
                        <Grid container>
                            <Grid item md={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCatch}
                                    className={classes.button}
                                >
                                    Catch
                                </Button>
                            </Grid>
                            <Grid item md={12}>
                                <Typography className={classes.text}>
                                    Height: {height}m
                                </Typography>
                                <Typography className={classes.text}>
                                    Weight: {weight}kg
                                </Typography>
                                {types.map((pokemonType) => {
                                    const { name } = pokemonType.type;
                                    return (
                                        <Typography className={classes.text} key={name}>
                                            Type: {name}
                                        </Typography>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Give Your Pokemon a Name</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Pokemon Name"
                            fullWidth
                            value={pokemonName}
                            onChange={(e) => setPokemonName(e.target.value)}
                            helperText={error}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelDialog} color="default">
                            Cancel
                        </Button>
                        <Button onClick={handleCloseDialog} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    } else {
        return <CircularProgress />;
    }
}

export default withStyles(styles)(PokemonDetails);
