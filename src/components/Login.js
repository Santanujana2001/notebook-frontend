import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { host } from "./Url";
function Login(props) {
  
    const [credentials, setCredentials] = useState({email:"",password:""});
    let history = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
        // SAVE AUTHTOKEN AND REDIRECT
        localStorage.setItem('token',json.authtoken)
        props.showAlert("logged in successfully","success")
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
    <h2 className="text-success">Login here</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control my-3" id="email" aria-describedby="emailHelp"name="email" value={credentials.email} onChange={onChange} placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control my-3" id="password" 
          name="password" value={credentials.password} onChange={onChange} placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
