import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import UserFormComponent from './UserFormComponent';
import UserListComponent from './UserListComponent';
import swal from 'sweetalert';



const UsersComponent = () => {
    const [isAdd, setIsAdd] = useState(false);
    const [user, setUser] = useState({
        idx: '',
        name: '',
        lastname: '',
        email: '',
        phone: ''
    });

    const handleAdd = () => {
        setUser({
            idx: '',
            name: '',
            lastname: '',
            email: '',
            phone: ''
        });
        setIsAdd(true);
    }

    return (
        <>
            <h1>Users Component</h1>
            <Grid container justify="center" spacing={2}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={10}>

                        {
                            isAdd ?
                                <UserFormComponent
                                    {...user}
                                    setIsAdd={setIsAdd}
                                />

                                :
                                <UserListComponent
                                    setIsAdd={setIsAdd}
                                    setUser={setUser}
                                />

                        }
                    </Grid>
                </Grid>
                {
                    isAdd ||
                    <Grid item xs={4}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleAdd}>Nuevo</Button>
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default UsersComponent;
