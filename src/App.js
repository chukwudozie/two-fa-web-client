import { Login } from '@mui/icons-material';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css';
import AppBar from './components/Appbar';
import Employee from './components/Employee';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import Registered from './components/Registered';
import UpdatePassword from './components/UpdatePassword';

function App() {
  return (
    <div className="App">
      <AppBar/>
        <Routes>
          <Route exact path="/admin" element={<Employee />}/>
          <Route path="/updatepassword" element={<UpdatePassword/>} />
          <Route exact path="/"  element={<LoginPage/>}/>
          <Route path="/home/:userName" element={<Home />}></Route>
          <Route path="/registered" element={<Registered />}></Route>

        </Routes>   
    </div>
  );
}

export default App;
