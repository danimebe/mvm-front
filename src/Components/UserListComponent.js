import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Grid } from '@material-ui/core';
import swal from 'sweetalert';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const UserListComponent = ({ setIsAdd, setUser }) => {
    const ENDPOINT = "http://127.0.0.1:3001";

    const [users, setUsers] = useState([]);
    const classes = useStyles();

    const getUsers = async () => {
        const usersData = await fetch(`${ENDPOINT}/users`);
        const { body } = await usersData.json();
        setUsers(body);
    };

    const deleteUser = async (idx) => {
        await fetch(`${ENDPOINT}/users`, {
            method: 'DELETE',
            body: JSON.stringify({ idx }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleDelete = (idx) => {
        swal({
            title: "Estás seguro de eliminar este usuario?",
            text: "Una vez eliminado no se podrá recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteUser(idx);
                    swal("Usuario eliminado correctamente", {
                        icon: "success",
                    });
                }
            });
    }

    const handleUpdate = (user, idx) => {
        setUser({ idx, ...user });
        setIsAdd(true);
    }

    return (
        users.length > 0 &&
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((data, i) => (
                            <tr key={i + Date.now()}>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.lastname}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>
                                    <Grid container justify="space-around" spacing={2}>
                                        <Grid item xs={4}>

                                            <Button fullWidth variant="contained" onClick={() => handleUpdate(data, i)}>Editar</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button color="secondary" fullWidth variant="contained" onClick={() => handleDelete(i)}>Eliminar</Button>
                                        </Grid>

                                    </Grid>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserListComponent
