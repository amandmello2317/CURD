import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { port } from '../Global';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"


};

export default function EditModel({ openEdit, handleClose, setOpenEdit, seletedUser }) {
    console.log(seletedUser, 66);


    const [updateData, setupdateData] = useState([])
    

    console.log(updateData, 1);
    


    useEffect(() => {
            setupdateData(seletedUser)
    }, [openEdit])


   

    const handleChange = (e) => {
        setupdateData({
            ...updateData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        axios.put(`${port}/api/user/update/${updateData?._id}`, updateData)
            .then((res) => {
                setOpenEdit(false)
                console.log(res.data);
            }).catch((err) => {
                console.log("Error :" + err);
            })
    }

    return (
        <div>
            <Modal
                open={openEdit}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit
                    </Typography>
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            name='name'
                            placeholder='name'
                            label="name"
                            variant="outlined"
                            size='small'
                            value={updateData?.name}
                            onChange={handleChange}

                        />
                    </Box>
                    <Box sx={{ mb: 2, mt: 1 }}>
                        <TextField
                            style={{ width: "200px", margin: "5px" }}

                            id="filled-textarea"
                            label=" email"
                            placeholder="email"
                            multiline
                            variant="outlined"
                            name='email'
                            maxRows={5}
                            value={updateData?.email}
                            onChange={handleChange}
                        />

                        <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="age"
                            name='age'
                            placeholder='age'
                            label="age"
                            variant="outlined"
                            value={updateData?.age}
                            onChange={handleChange}


                        />
                        <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            name='phone'
                            placeholder='phone'
                            label="phone"
                            variant="outlined"
                            value={updateData?.phone}
                            onChange={handleChange}


                        />
                    </Box>
                    <Box>
                        <Button variant="outlined" sx={{ marginRight: 6 }} onClick={() => { handleSubmit() }}>Submit</Button>
                        <Button variant="outlined" color="error" onClick={() => setOpenEdit(false)}>Cancle</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}
