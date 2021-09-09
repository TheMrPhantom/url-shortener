import React from 'react'
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { useState } from 'react';

const LinkTableEntryAdd = ({ apiPost, snackbar }) => {

    const [shortname, setshortname] = useState("")
    const [url, seturl] = useState("")
    const [buttonDisabled, setbuttonDisabled] = useState(false)

    const handleAddClick = async () => {
        setbuttonDisabled(true)
        const resp = await apiPost("links/add", { shortname: shortname, url: url })
        if (resp.code === 200) {
            snackbar("Redirect added", "success")
            setshortname("")
            seturl("")
            setbuttonDisabled(false)
        } else {
            snackbar("Something went wrong", "error")
        }
    }

    return (

        <TableRow>
            <TableCell >  <TextField style={{ width: "100%" }} id="" label="Short Name" type="input" value={shortname} onChange={event => setshortname(event.target.value)} /></TableCell>
            <TableCell > <TextField style={{ width: "100%" }} label="URL" type="input" value={url} onChange={event => seturl(event.target.value)} /></TableCell>
            <TableCell ></TableCell>
            <TableCell style={{ width: "70px" }}>
                {!buttonDisabled?
                <Button onClick={() => handleAddClick()}>
                    <AddBoxIcon style={{ color: "#8bc34a" }} />
                </Button>
                :""}
            </TableCell>
        </TableRow>

    )
}

export default LinkTableEntryAdd
