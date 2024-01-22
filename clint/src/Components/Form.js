import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl, Paper } from '@mui/material';
import { port } from '../Global';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



export default function Form() {

    const navigate = useNavigate()
    

    const [user, setUser] = useState({
        img:[]
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value

        })
    }
    console.log(user);

    // Single

    // const handleChangeImage = (e) => {
    //     setUser({
    //         ...user,
    //         [e.target.name] : e.target.files[0]
    //     })
    // }

    // multiple Image
    const handleChangeImage = (e, index) => {
        const image = [...user.img]
        image[index] = e.target.files[0]
        setUser({
            ...user,
            'img' : image
        })
    }

    const handleSubmit = () => {

        const val = new FormData()
        val.append("name", user.name)
        val.append("email", user.email)
        val.append("age", user.age)
        val.append("phone", user.phone)
        // val.append("img", user.img)
        {user.img.map((image) => (
            val.append("img", image)
        ))}


        axios.post(`${port}/api/user/userinsert`, val)
        .then((res) => {
            console.log("Inserted Info :" + res.data);
            navigate("/view")
        })
        .catch((err) => {
            console.log("Error :" + err);
        })
    }
    

    return (
        <div style={{ marginTop: "10px" }}>
            <h2>FORM</h2>
            <Paper sx={{ width: "400px", margin: "20px  auto" }}>

                <FormControl>

                    <TextField
                        label="Enter Name"
                        sx={{ mt: 2 }}
                        onChange={(e) => handleChange(e)}
                        name='name'
                    />
                    <TextField
                        label="Enter Email"
                        sx={{ mt: 2 }}
                        onChange={(e) => handleChange(e)}
                        name='email'


                    />
                    <TextField
                        label="Enter Phone"
                        sx={{ mt: 2 }}
                        onChange={(e) => handleChange(e)}
                        name='phone'


                    />
                    <TextField
                        label="Enter age"
                        sx={{ mt: 2 }}
                        onChange={(e) => handleChange(e)}
                        name='age'


                    />

                    {/* Images */}
                    <TextField 
                        name='img'
                        type='file'
                        sx={{ mt: 2 }}
                        size='small'
                        onChange={(e) => handleChangeImage(e, 0)}


                    />
                    <TextField 
                        name='img'
                        type='file'
                        sx={{ mt: 2 }}
                        size='small'
                        onChange={(e) => handleChangeImage(e, 1)}


                    />
                    <TextField 
                        name='img'
                        type='file'
                        sx={{ mt: 2 }}
                        size='small'
                        onChange={(e) => handleChangeImage(e,2)}


                    />

                    <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 2, mb:1 }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 2, mb:2 }}
                        onClick={() => navigate('/view')}
                    >
                        view
                    </Button>

                </FormControl>
            </Paper>
        </div>
    )
}
