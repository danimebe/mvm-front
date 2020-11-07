import { Button, FormControl, Grid, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const UserFormComponent = ({ idx, name = '', lastname = '', email = '', phone = '', setIsAdd }) => {

    const ENDPOINT = "http://127.0.0.1:3001";

    const classes = useStyles();
    const [user, setUser] = useState({
        idx,
        name,
        lastname,
        email,
        phone
    });
    const [sent, setSent] = useState(false);

    console.log(idx)
    const handleChangeName = (event) => {
        setUser({
            ...user,
            name: event.target.value
        })
    }
    const handleChangeLastName = event => {
        setUser({
            ...user,
            lastname: event.target.value
        })
    }

    const handleChangeEmail = (event) => {
        setUser({
            ...user,
            email: event.target.value
        })
    }

    const handleChangePhone = (event) => {
        setUser({
            ...user,
            phone: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        setSent(true);
        event.preventDefault();


        if (user.idx || user.idx === 0) {
            const res = await fetch(`${ENDPOINT}/users`, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            console.log(data)

            if (data.error) {
                swal({
                    title: "Error al actualizar usuario",
                    text: "Valida todos los campos",
                    icon: "error",
                });
            } else {
                swal({
                    title: "Usuario guardado",
                    text: data.body,
                    icon: "success",
                }).then(() => {
                    setIsAdd(false);
                });
            }
        } else {
            const res = await fetch(`${ENDPOINT}/users`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (data.error) {
                swal({
                    title: "Error al guardar usuario",
                    text: "Valida todos los campos",
                    icon: "error",
                });
            } else {
                swal({
                    title: "Usuario guardado",
                    text: data.body,
                    icon: "success",
                }).then(() => {
                    setIsAdd(false);
                });
            }

        }
    }


    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={8}>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <FormControl error={sent && user.name === ''} fullWidth margin="normal">
                            <InputLabel htmlFor="component-simple">Nombre</InputLabel>
                            <Input type="text" id="component-simple" value={user.name} onChange={handleChangeName} />
                        </FormControl>
                        <FormControl error={sent && user.lastname === ''} fullWidth margin="normal">
                            <InputLabel htmlFor="component-simple">Apellido</InputLabel>
                            <Input type="text" id="component-simple" value={user.lastname} onChange={handleChangeLastName} />
                        </FormControl>
                        <FormControl error={sent && user.email === ''} fullWidth margin="normal">
                            <InputLabel htmlFor="component-simple">Email</InputLabel>
                            <Input type="email" id="component-simple" value={user.email} onChange={handleChangeEmail} />
                        </FormControl>
                        <FormControl error={sent && user.phone === ''} fullWidth margin="normal">
                            <InputLabel htmlFor="component-simple">Teléfono</InputLabel>
                            <Input type="phone" id="component-simple" value={user.phone} onChange={handleChangePhone} />
                        </FormControl>
                        <Grid container justify="space-around" spacing={2} margin="normal">
                            <Grid item xs={5}>
                                <Button fullWidth variant="contained" color="primary" type="submit">Guardar</Button>
                            </Grid>
                            <Grid item xs={5}>
                                <Button fullWidth variant="contained" color="secondary" onClick={() => setIsAdd(false)}>Cancelar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div >
    )
}

export default UserFormComponent;
