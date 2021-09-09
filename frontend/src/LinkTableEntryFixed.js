import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Button from '@material-ui/core/Button';
import { useState } from 'react';

const LinkTableEntryFixed = ({ id, short, url, clicks, apiPost, snackbar }) => {

    const [buttonDisabled, setbuttonDisabled] = useState(false)

    const handleRemoveClick = async () => {
        setbuttonDisabled(true)
        const resp = await apiPost("links/remove", { id: id })
        if (resp.code === 200) {
            snackbar("Redirect added", "success")
        } else {
            snackbar("Something went wrong", "error")
            setbuttonDisabled(false)
        }

    }

    return (
        <TableRow className="examitem" >
            <TableCell > {short}</TableCell>
            <TableCell >{url}</TableCell>
            <TableCell >{clicks}</TableCell>
            <TableCell style={{ width: "70px" }}>
                {!buttonDisabled?
                <Button onClick={() => handleRemoveClick()}>
                    <IndeterminateCheckBoxIcon style={{ color: "#d11800" }} />
                </Button>
                :""}
            </TableCell>
        </TableRow>
    )
}

export default LinkTableEntryFixed
