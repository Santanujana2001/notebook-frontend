import React,{useState} from 'react'
import './App.css';
import {Routes , Route, BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './components/context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <BrowserRouter>
    <NoteState>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
      <Route path='/' element={<Home showAlert={showAlert}/> } />
      <Route path='/about' element={<About/>} />
      <Route path='/login' element={<Login showAlert={showAlert}/>} />
      <Route path='/signup' element={<Signup showAlert={showAlert}/>} />
      </Routes>
      </div>
      </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
