import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function Appbar() {

  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/")
  } 

  const handleRegistered = () =>{
    if(localStorage.getItem("role") == 'ADMIN'){
      navigate("/registered")
    }
  }

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const login = <Link href="/" underline="none" style={{"color":"white"}} >LOGIN</Link>   
  const logout =  <Link href=""  onClick={handleLogout} underline="none" style={{"color":"white"}} >LOGOUT</Link>
  const view = <Link href="/registered" underline="none" style={{"color":"white","padding-left":"80px"}} hidden={role ==="USER"}>ALL USERS</Link>     
 
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SEAICO MUTLI FACTOR AUTHENTICATION
          </Typography>
          {token ? logout:login}<br/>
          {view}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
