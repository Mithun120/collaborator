import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setemailVal] = useState('');
  const [password, setpassVal] = useState('');
  const [error, setError] = useState(null);

    const navigate=useNavigate();
  const handleClick = async(e) => {
    e.preventDefault();
    try{
    const data={email,password}
    await axios
      .post('http://localhost:4000/auth/login/auth', data)
      .then(response => {
        console.log(response.data);
        const accessToken=response.data.accessToken;
        localStorage.setItem('accessToken',accessToken);
        // navigate("/home")
      }).then(navigate("/home"))
      .catch(error => {
        console.log('Login failed', error);
        setError(error);
      });}
      catch(err)
      {
        console.log(err)
      }
  };

  return (
    <div>
        <form onSubmit={handleClick}>
      <input
        type="email"
        value={email}
        onChange={e => setemailVal(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setpassVal(e.target.value)}
      />
      <button type="submit">Submit</button>
      </form>
      {error && (
        <>
          <p>Login failed.....</p>
        </>
      )}
    </div>
    
  );
};

export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Define the data to send in the request
//       const data = {
//         email: email,
//         password: password
//       };

//       // Make the POST request
//       const response = await axios.post('http://localhost:2000/auth/login/auth', data);

//       // Handle the response
//       console.log(response.data); // Assuming the response is JSON data
//     } catch (error) {
//       // Handle the error
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
