import { Box } from "@mui/material";
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";


export default function UpdatePassword() {

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
    const [defaultPassword, setDefaultPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [uNameerror, setUNameError] = useState('')
    const [perror, setPError] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [defPasswordError , setDefPasswordError] = useState("")
    const [successMessage, setSuccessMessage] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    // const [showPassword, setShowPassword] = useState(false)


    const [user, setUser] = useState({
      userName:"",
      defaultPassword:"",
      password:"",
      confirmPassword:""
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
          const response = await fetch(`http://localhost:9000/auth/update/${user.userName}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              userName:user.userName,
              defaultPassword:user.defaultPassword,
              password:user.password,
              confirmPassword:user.confirmPassword
            })
          });
          console.log("i got here")
          console.log(response)
          const res = await response.json();
          console.log(res,"res")
          console.log(response.status, 'STATUS');  
          console.log(response.statusText,"MESSAGE")
        
          if (res.status !== "OK"){
                  if (user.userName.length <= 1){
                    setUNameError("User name must be up to 2 letters");
                  }else{
                    setUNameError("");
                  }     
                  if (user.password.length <= 1){
                    setPError("New password should be at least 2 letters");
                  }else{
                    setPError("");
                  }
                   if (user.defaultPassword.length <= 1){
                    setDefPasswordError("default password sent to your mail");
                  }else{
                    setDefPasswordError("");
                  }
                  if (user.confirmPassword.length <= 1) {
                    setConfirmPasswordError('this field is compulsory')
                  } else{
                    setConfirmPasswordError('')
                  }
                setErrorMessage(res.message);
                setSuccessMessage('You will get a mail to reset your password and proceed to login')
  
              } else {
                console.log("hello");
                setSuccessMessage('Password update successful')

                setUser('')
                setErrorMessage(res.message);
                setUserName('')
                setPassword('')
                navigate("/")

  
              }
  
          console.log("here")
          console.log(response);     
          console.log(response.message, "here");
  
  
      }catch(e){
  console.log(e,"ERROR");
  setErrorMessage("Could not update user password, incorrect credentials")
      }
    }

    const handleClick  =(e)=>{
      console.log("emeka")
      e.preventDefault()
      fetchApi()
    }

    const [visible, setVisible] = useState(false);

    const showPassword =()=>{
      setVisible(!visible)
    }


    return(
    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:"#1976d2"}}>Update your password</h1>

        <Box component="form"   sx={{'& > :not(style)': { m: 1, width: '35ch' },}} autoComplete="on">

        <TextField error={uNameerror !== ""} helperText={uNameerror} name="userName" id="outlined-error" label="Username" variant="outlined" fullWidth  
        value={user.userName} onChange={handleInputChange} required/><br/>

        <TextField error={defPasswordError !== ""} helperText={defPasswordError} name="defaultPassword" id="outlined-error" label="Default Password" variant="outlined" fullWidth  
        value={user.defaultPassword} onChange={handleInputChange} type={visible?"text":"password"} onDoubleClick={showPassword} required/><br/>

        <TextField error={perror !== ""} helperText={perror} name = "password" id="outlined-error" label="New Password" variant="outlined" fullWidth  
        value={user.password} onChange={handleInputChange} type={visible?"text":"password"} onDoubleClick={showPassword} required/><br/>

        <TextField error= {perror !== ""} helperText={perror} name="confirmPassword" id="outlined-error" label="Confirm New Password" variant="outlined" fullWidth  
        value={user.confirmPassword} onChange={handleInputChange} type={visible?"text":"password"} onDoubleClick={showPassword} required/><br/>

        <Button variant= "contained" color="inherit" onClick={handleClick}>UPDATE PASSWORD</Button><br/>
         {errorMessage && <div style={errorStyle}> {errorMessage} </div>}
        </Box>

        </Paper>
    </Container>
    )
}