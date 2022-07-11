import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert';

const Signup = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword:"" })
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch(`http://localhost:4000/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmYxNDVlZWY1MWU4ZTM0ZWU1MWQ4NyIsImlhdCI6MTY1NjY4OTc2Mn0.MEdvHv7pMMaTKVjS11NgKOxQppoRCncZ8GmtrPuDDL0"
      },
      body: JSON.stringify({ name,email,password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save auth token
      localStorage.setItem('token', json.authtoken);
      history("/");
    }
    else{
      console.log("Failed");
      <Alert message="Singup Failed!!!"/>
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="name" className="form-label">Enter username</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Comfirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup