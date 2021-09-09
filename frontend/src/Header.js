import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./main.css"

const Header = ({ onLogOut }) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar className="headerButton">
                    <Typography variant="h6" >
                        URL Shortener
                    </Typography>

                    <Button color="inherit" onClick={onLogOut}>Logout</Button>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
