// import { Container, Paper } from "@material-ui/core";
// import React, { useState, useEffect } from "react";

// export default function Registered() {

//     const [employees, setEmployees] = useState('');

//     const paperStyle = {
//         padding:'50px 20px',
//         width: 900,
//         margin:"20px auto" 
//       }

//     useEffect(()=>{
//         fetch("http://localhost:9000/auth/get-all")
//         .then(res=>res.json())
//         .then((result)=>{
//           setEmployees(result);
//           console.log("Fetching data")
//         }).catch((error) =>{
//           console.log(error);
//         })
//       },[]);

//     return (
//         <Container>
//             <div>I came to the view all registered page because I am logged in as an admin</div>
//             <Paper elevation={3} style={paperStyle}>
//     <h3>Registered Users</h3>
//       {employees.map(employee =>(
//         <Paper elevation={4} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={employee.id}>
//           Id: {employee.id}<br/>
//           Username: {employee.userName}<br/>
//           Password: {employee.password}<br/>
//           Application Type: {employee.application} <br/>
//           Full Name: {employee.fullName}<br/>
//           Email: {employee.email}<br/>
//           Role ? : {employee.role}
//         </Paper>
//       ))}

//     </Paper>
//         </Container>
//     )

// }



import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
