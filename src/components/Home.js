import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Home() {

  const token = localStorage.getItem("token");
  console.log(token);
  const { userName } = useParams();
  const loggedInUserName = userName;

  const paperStyle = {
    padding:'50px 20px',
    width: 900,
    margin:"20px auto" 
  }
  const errorStyle = {
    padding:'10px 10px',
    width: 90,
    margin:"10px auto",
    textAlign: 'center',
    color:"red",
    // background:"red"
  }
  const [employees,setEmployees] = useState([])
  const [uNameerror, setUNameError] = useState('')
  const [fNameerror, setFNameError] = useState('')
  const [successMessage, setSuccessMessage] = ('')
  const [userToken, setUserToken] = useState('')
  const [previousToken, setPreviousToken] = useState('')
  const [counter, setCounter] = React.useState(30);

  

  // const [user, setUser] = useState({
  //   userName:"",
  //   fullName:"",
  //   email:"",
  //   application:"",
  //   admin:""
  // });

  const [obj, setObj] = useState({
    status:"",
    message:"",
    token:"",
    fullName:"",
    role:""
  })

      
  const [errorMessage,setErrorMessage] = useState('')

  // const navigate = useNavigate("http://localhost:3000/home");

  const handleInputChange =(event)=>{
    const value = event.target.value;
    setObj({
      ...obj, [event.target.name]:value
    });
  }


  const api = `http://localhost:9000/two-factor/send-token-web/${loggedInUserName}`;

  const fetchApi = async ()=> {
    try{  
      console.log("employees1")
      const response = await fetch(api,{
        method:"POST",
        headers:{
          Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': "Bearer " + token,
           },
        body:JSON.stringify({
          status:obj.status,
          message:obj.message,
          token:obj.token,
          fullName:obj.fullName,
          role:obj.role
        })
      });
        console.log(response)
        const res = await response.json();
        console.log(res,"res")
        console.log(response.status, 'STATUS');  
        console.log(response.statusText,"MESSAGE")
        console.log(res.message,"message")
        setFNameError(res.fullName)
        setErrorMessage(res.message);

      
        if (res.status !== "OK"){
                // if (user.userName.length <= 1){
                //   console.log(user.userName.length," I came here to username error")
                //   setUNameError("User name must be up to 2 letters");
                // }else{
                //   setUNameError("");
                // }     
                // if (user.fullName.length <= 1){
                //   console.log(user.fullName.length," I came here to full name error")
                //   setFNameError("Full name should be at least 2 letters");
                // }else{
                //   setFNameError("");
                // }
                //  if (user.email.length <= 1){
                //   console.log(user.email.length," I came here to email error")
                //   setEmailError("Provide a valid email");
                // }else{
                //   setEmailError("");
                // }
                setUserToken()
                console.log("Still in error")
              setErrorMessage(res.message);
              setSuccessMessage('You will get a mail to reset your password and proceed to login')

            } else {
              console.log("hello");
              // navigate("/updatepassword")
              setUserToken(res.token)
              setSuccessMessage('User successfully created, You will get a mail to reset your password and proceed to login')

              setErrorMessage('error');
              
              setSuccessMessage("User successfully created, You will get a mail to reset your password and proceed to login");

            }

        console.log("here")
        console.log(response);     
        console.log(response.message, "here");


    }catch(e){
      console.log("Error occured")

    }
  }

  const [disabled, setDisabled] = useState(false)

  const handleClick= (e)=>{
    e.preventDefault()
    fetchApi()
    setCounter(30)
    setDisabled(!disabled)
  
  }


  // Third Attempts
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() =>{
    if(counter <= 2){
      setDisabled(!disabled)
      if (disabled == true) {
        setCounter(30)

      }
    }
  })

 

  // useEffect(()=>{
  //   fetch("http://localhost:8080/auth/get-all")
  //   .then(res=>res.json())
  //   .then((result)=>{
  //     setEmployees(result);
  //   }).catch((error) =>{
  //     console.log(error);
  //   })
  // },[]);

 

  return ( 
    <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{color:"#1976d2"}}>Welcome {loggedInUserName}</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      // noValidate
    
      autoComplete="on"
    >
      <TextField  style ={errorStyle}name="token" id="outlined-basic" label="" variant="outlined" fullWidth  
      value={userToken} onChange={handleInputChange}/><br/>

      <Button variant= "contained" color="inherit" onClick={handleClick} disabled={disabled} >GENERATE TOKEN</Button> <br/><div hidden={disabled == false} style={{"textAlign":"center"}}>Expires at: {counter} seconds</div>
<br/>
      {errorMessage && <div style={errorStyle}> {errorMessage} </div>}

    </Box>
    
    </Paper>
    

    </Container>
  );
}
