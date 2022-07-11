import React, { useState } from 'react'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmYxNDVlZWY1MWU4ZTM0ZWU1MWQ4NyIsImlhdCI6MTY1NjY4OTc2Mn0.MEdvHv7pMMaTKVjS11NgKOxQppoRCncZ8GmtrPuDDL0"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className="my-4 ">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login