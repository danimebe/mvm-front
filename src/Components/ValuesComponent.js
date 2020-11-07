import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const ValuesComponent = () => {
    const ENDPOINT = "http://127.0.0.1:3001";

    const [response, setResponse] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, { transports: ['websocket'] });
        socket.on("FromAPI", ({ data }) => {
            setResponse(data);
        })

        return () => socket.disconnect();
    }, [])

    return (
        response.length > 0 &&
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Valor1</TableCell>
                        <TableCell>Valor2</TableCell>
                        <TableCell>Valor3</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        response.map((data) => (
                            <tr key={data.Nombre + Date.now()}>
                                <TableCell>{data.Nombre}</TableCell>
                                <TableCell>{data.Valor1}</TableCell>
                                <TableCell>{data.Valor2}</TableCell>
                                <TableCell>{data.Valor3}</TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ValuesComponent
