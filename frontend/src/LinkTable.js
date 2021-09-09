import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import LinkTableEntryFixed from './LinkTableEntryFixed';
import LinkTableEntryAdd from './LinkTableEntryAdd';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';

import "./main.css";

const LinkTable = ({ getRequest, postRequest, snackbar}) => {

    const [links, setlinks] = useState([])

    useEffect(() => {
        const load = async () => {
            const fetchedLinks = await getRequest("links")
            console.log(fetchedLinks)
            setlinks(fetchedLinks.content)
        }
        load()
    }, [snackbar])

    return (
        <div className="floatMiddle">
            <TableContainer style={{ marginTop: "20px", width: "90%" }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Short Name</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell >Clicks</TableCell>
                            <TableCell >Add/Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <LinkTableEntryAdd apiPost={postRequest} snackbar={snackbar}/>
                        {links.map((link) => <LinkTableEntryFixed key={link[0]} id={link[0]} short={ link[1]} url={ link[2] } clicks={link[3]} apiPost={postRequest} snackbar={snackbar} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default LinkTable
