import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { host } from "./Url";

function Signup(props) {
  // const host = "https://notebackend-2zn4.onrender.com";
  // const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  let history = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    // console.log(json)
    if(json.success){
        // SAVE AUTHTOKEN AND REDIRECT
        localStorage.setItem('token',json.authtoken)
        props.showAlert("account created","success")
        history("/")
    }
    else{
        props.showAlert("invalid credentials","danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3">
    <h2 className="text-success">Create account</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control my-3" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control my-3" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control my-3" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} required/>
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control my-3" id="cpassword" name="cpassword" onChange={onChange} placeholder="Confirm Password" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
