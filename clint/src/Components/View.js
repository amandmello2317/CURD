import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { port } from '../Global';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EditModel from './EditModel';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function View() {
    const [data, setData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [seletedUser, setSeletedUser] = useState([])
    const [count, setcount] = useState(false)

    useEffect(() => {
        axios.get(`${port}/api/user/display`)
            .then((res) => {
                console.log(res.data);
                setData(res.data)
            }).catch((err) => {
                console.log("Error :" + err);
            })


    }, [openEdit, count])


    const handleClose = () => {
        setOpenEdit(false)

    }

    const handleEdit = (e) => {
        setOpenEdit(true)
        console.log(e);
        setSeletedUser(e)
    }



    console.log(seletedUser, 1);

    const handleDelete = (id) => {
        axios.delete(`${port}/api/user/delete/${id}`)
        .then((res) => {
            console.log(res.data);
            setcount((prev) => !prev)
        }).catch((err) => {
            console.log("Error :" + err);
        })
        console.log(id);
    }



    return (
        <>
            <Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">id</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">Age</StyledTableCell>
                                <StyledTableCell align="right">Phone</StyledTableCell>
                                <StyledTableCell align="right">image</StyledTableCell>
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((i, index) => (

                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                        {index = index + 1}
                                    </StyledTableCell>


                                    <StyledTableCell align="right">{i.name}</StyledTableCell>
                                    <StyledTableCell align="right">{i.email}</StyledTableCell>
                                    <StyledTableCell align="right">{i.age}</StyledTableCell>
                                    <StyledTableCell align="right">{i.phone}</StyledTableCell>
                                    <StyledTableCell align="right">

                                    {i.img.map((image) => (
                                    <img src={`${port}/api/image/${image}`} alt="No img" height={200} width={200} />
                                    ))}
                                    
                                    {/* <img src={upload+"/"+e.img} alt="" /> */}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">

                                        <Button onClick={() => handleEdit(i)}>Update</Button>
                                        <Button onClick={() => handleDelete(i._id)}>Delete</Button>
                                    </StyledTableCell>

                                </StyledTableRow>


                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Link to={"/"}>Back</Link>
            </Box>

            <EditModel

                seletedUser={seletedUser}
                data={data}
                handleClose={handleClose}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
            />
        </>


    );
}