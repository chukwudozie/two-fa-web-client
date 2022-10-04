import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const paperStyle = {
        padding:'50px 20px',
        width: 900,
        margin:"20px auto" 
      }

      const errorStyle = {
        padding:'10px 10px',
        width: 900,
        margin:"10px auto",
        textAlign: 'center',
        color:'red'
      }

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [uNameerror, setUNameError] = useState('')
    const [perror, setPError] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')


    const [user, setUser] = useState({
      userName:"",
      password:"",
    });



    const handleInputChange =(event)=>{
      const value = event.target.value;
      setUser({
        ...user, [event.target.name]:value
      });
    }

    const navigate = useNavigate();

    const fetchApi = async ()=> {
      try{  
          const response = await fetch(`http://localhost:9000/auth/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              userName:user.userName,
              password:user.password            })
          });
          const res = await response.json();
          localStorage.setItem("token",res.token)  
          localStorage.setItem("role",res.role)
          if (res.status !== "OK"){
                  if (user.userName.length <= 1){
                    setUNameError("User name must be up to 2 letters");
                  }else{
                    setUNameError("");
                  }     
                   if (user.password.length <= 1){
                    setPError("Provide a new password");
                  }else{
                    setPError("");
                  }
                setErrorMessage(res.message);
                setSuccessMessage('')
  
              } else {
                console.log("Login Successful");
                setSuccessMessage('Login Successful ')
                if(res.role === 'ADMIN'){
                  navigate(`/admin`)

                }else {
                  navigate(`/home/${user.userName}`)
                }

                setUser('')
                setErrorMessage(res.message);
                setUserName('')
                setPassword('')
        
              }
  
          console.log("here")
          console.log(response);     
          console.log(response.message, "here");
  
  
      }catch(e){
        console.log(e,"ERROR");
        setErrorMessage("Invalid user name or password: Connection Error ");
      }
    }

    const handleClick  =(e)=>{
      console.log("emeka")
      e.preventDefault()
      fetchApi()
    }

    const [visible, setVisible] = useState(true);
  const showPassword =()=>{
    setVisible(!visible)
  }
    return(
    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:"#1976d2"}}>Login</h1>

        <Box component="form"   sx={{'& > :not(style)': { m: 1, width: '35ch' },}} autoComplete="on">
        <TextField  name="userName" id="outlined-basic" label="Username" variant="outlined" fullWidth  
        value={user.userName} onChange={handleInputChange} required/><br/>

        <TextField type={visible?"text":"password"} name="password" id="outlined-basic" label="password" variant="outlined" fullWidth  
        value={user.password} onChange={handleInputChange} onClick={showPassword} required/><br/>

        {/* <Button onClick={showPassword}>SHOW</Button> */}

        <Button variant= "contained" color="inherit" onClick={handleClick}>LOGIN</Button><br/>
         {errorMessage && <div style={errorStyle}> {errorMessage} </div>}
         {successMessage && <div style={errorStyle}> {successMessage} </div>}

        </Box>
        </Paper>
    </Container>
    )
}