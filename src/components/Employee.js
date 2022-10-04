import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Employee() {
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
  const [employees,setEmployees] = useState([])
  const [uNameerror, setUNameError] = useState('')
  const [fNameerror, setFNameError] = useState('')
  const [emailerror, setEmailError] = useState('')
  const [successMessage, setSuccessMessage] = ('')
  

  const [user, setUser] = useState({
    userName:"",
    fullName:"",
    email:"",
    application:"",
    admin:""
  });

      
  const [errorMessage,setErrorMessage] = useState('')

  const navigate = useNavigate("http://localhost:3000/updatepassword");

  const handleInputChange =(event)=>{
    const value = event.target.value;
    setUser({
      ...user, [event.target.name]:value
    });
  }


  // const handleAdminChange = (event: SelectChangeEvent) => {
  //   setAdmin(event.target.value );
  // };

  // const handleApplicationChange = (event: SelectChangeEvent) => {
  //   setApplication(event.target.value );
  // };

  const fetchApi = async ()=> {
    try{  
      console.log("employees1")
        const response = await fetch("http://localhost:9000/auth/register",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            userName:user.userName,
            fullName:user.fullName,
            email:user.email,
            application:user.application,
            admin:user.admin
          })
        });
        console.log(response)
        const res = await response.json();
        console.log(res,"res")
        console.log(response.status, 'STATUS');  
        console.log(response.statusText,"MESSAGE")
      
        if (res.status !== "OK"){
                if (user.userName.length <= 1){
                  console.log(user.userName.length," I came here to username error")
                  setUNameError("User name must be up to 2 letters");
                }else{
                  setUNameError("");
                }     
                if (user.fullName.length <= 1){
                  console.log(user.fullName.length," I came here to full name error")
                  setFNameError("Full name should be at least 2 letters");
                }else{
                  setFNameError("");
                }
                 if (user.email.length <= 1){
                  console.log(user.email.length," I came here to email error")
                  setEmailError("Provide a valid email");
                }else{
                  setEmailError("");
                }
                console.log("Still in error")
              setErrorMessage(res.message);
              setSuccessMessage('You will get a mail to reset your password and proceed to login')

            } else {
              console.log("hello");
              navigate("/updatepassword")
              setSuccessMessage('User successfully created, You will get a mail to reset your password and proceed to login')

              setErrorMessage('');
              // setUserName('')
              // setFullName('')
              // setEmail('')
              // setApplication('')
              // setAdmin('')
              setUser("")
              setSuccessMessage("User successfully created, You will get a mail to reset your password and proceed to login");

            }

        console.log("here")
        console.log(response);     
        console.log(response.message, "here");


    }catch(e){

    }
  }

  const handleClick= (e)=>{
    e.preventDefault()
    fetchApi()
    // const employee = {userName, fullName, application, email, admin}
    // setEmployeeData(employee)
    // console.log(employee)

    // fetch("http://localhost:8080/auth/register",{
    //   method:"POST",
    //   headers:{"Content-Type":"application/json"},
    //   body:JSON.stringify(employee)
    // })
    // .then(res=>res.json())
    // .then(function(response){
    //   JSON.stringify(response);
    //   console.log(response.message);
    //   console.log(response.status)
    //   if (response.message !== undefined){
    //       if (userName.length <= 1){
    //         setUNameError("User name must be up to 2 letters");
    //       }else{
    //         setUNameError("");
    //       }     
    //       if (fullName.length <= 1){
    //         setFNameError("Full name should be at least 2 letters");
    //       }else{
    //         setFNameError("");
    //       }
    //        if (email.length <= 1){
    //         setEmailError("Provide a valid email");
    //       }else{
    //         setEmailError("");
    //       }
    //     setErrorMessage(response.message);
    //   } else {
    //     setErrorMessage('');
    //     setUserName('')
    //     setFullName('')
    //     setEmail('')
    //     setApplication('')
    //     setAdmin('')
    //     alert("User successfully created, You will get a mail to reset your password and proceed to login");
    //   }
    // })
     
      // fetchApi();
  
  }

  useEffect(()=>{
    fetch("http://localhost:9000/admin/get-all")
    .then(res=>res.json())
    .then((result)=>{
      setEmployees(result);
    }).catch((error) =>{
      console.log(error.toString());
    })
  },[]);

 

  return ( 
    <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{color:"#1976d2"}}>Create User</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '35ch' },
      }}
      // noValidate
    
      autoComplete="on"
    >
      <TextField error={uNameerror !== ""} helperText={uNameerror} name="userName" id="outlined-error" label="Username" variant="outlined" fullWidth  
      value={user.userName} onChange={handleInputChange} required/><br/>

      <TextField error={fNameerror !== ""} helperText={fNameerror} name="fullName" id="outlined-error" label="Full Name" variant="outlined" fullWidth  
      value={user.fullName} onChange={handleInputChange} required/><br/>

      <TextField error= {emailerror !== ""} helperText={emailerror} name="email" id="outlined-error" label="Email" variant="outlined" fullWidth  
      value={user.email} onChange={handleInputChange} required/><br/>

      <FormControl>
        <InputLabel id="demo-simple-select-label">Application</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="application"
          value={user.application}
          label="application"
          // onChange={handleApplicationChange}
      
          onChange={handleInputChange}
        >
          <MenuItem value={"Calypso"}>Calypso</MenuItem><br/>
          <MenuItem value={"Finacle"}>Finacle</MenuItem><br/>
          <MenuItem value={"Others"}>Others</MenuItem>

        </Select>
      </FormControl><br/>

<FormControl>
        <InputLabel id="demo-simple-select-label">Admin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="admin"
          value={user.admin}
          label="Admin"
          // onChange={handleAdminChange}
          onChange={handleInputChange}
        >
          <MenuItem value={"Yes"}>Yes</MenuItem><br/>
          <MenuItem value={"No"}>No</MenuItem>
        </Select>
      </FormControl><br/>
 
      <Button variant= "contained" color="inherit" onClick={handleClick}>SIGN UP</Button><br/>
      {errorMessage && <div style={errorStyle}> {errorMessage} </div>}

    </Box>
    
    </Paper>
    
    <Paper elevation={3} style={paperStyle}>
    <h3>Registered Users</h3>
      {employees.map(employee =>(
        <Paper elevation={4} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={employee.id}>
          Id: {employee.id}<br/>
          Username: {employee.userName}<br/>
          Password: {employee.password}<br/>
          Application Type: {employee.application} <br/>
          Full Name: {employee.fullName}<br/>
          Email: {employee.email}<br/>
          Role ? : {employee.role}
        </Paper>
      ))}

    </Paper>
    </Container>
  );
}
