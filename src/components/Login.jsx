

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./login.css"
// const Login = (props) => {
//     const [credentials, setCredentials] = useState({ email: '', password: '' });
//     const navigate = useNavigate();
//     const host = "http://localhost:4000";

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch(`${host}/api/users/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: credentials.email, password: credentials.password }),
//         });
//         const json = await response.json();

//         if (json.token) {
//             localStorage.setItem('token', json.token);
//             props.showAlert("Logged in Successfully", "success");
//             navigate('/');
//         } else {
//             props.showAlert("Invalid Credentials", 'danger');
//         }
//     };

//     const onChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-lg-3 col-md-2"></div>
//                 <div className="col-lg-6 col-md-8 login-box">
//                     <div className="col-lg-12 login-key">
//                         <i className="fa fa-key" aria-hidden="true"></i>
//                     </div>
//                     <div className="col-lg-12 login-title">
//                         Login
//                     </div>
//                     <div className="col-lg-12 login-form">
//                         <div className="col-lg-12 login-form">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group">
//                                     <label className="form-control-label">Email</label>
//                                     <input type="text" className="form-control" name="email" value={credentials.email} onChange={onChange} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-control-label">Password</label>
//                                     <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
//                                 </div>
//                                 <div className="col-lg-12 loginbttm">
//                                     <div className="col-lg-6 login-btm login-text">
//                                         {/* Error Message */}
//                                     </div>
//                                     <div className="col-lg-6 login-btm login-button">
//                                         <button type="submit" className="btn btn-outline-primary">LOGIN</button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                     <div className="col-lg-3 col-md-2"></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [admin, setAdmin] = useState(false);
    const [student, setStudent] = useState(false);
    const [truth, setTruth] = useState(true);
    const navigate = useNavigate();
    const host = "https://e-library-server-jyjf.onrender.com";


    useEffect(() => {
        document.body.classList.add('login-signup-background');
        return () => {
          document.body.classList.remove('login-signup-background');
        };
      }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${host}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();

        if (json.token) {
            localStorage.setItem('token', json.token);
            toast.success("Logged in Successfully");
            props.showAlert("Logged in Successfully", "success");
            navigate('/');
        } else {
            toast.error("Invalid Credentials");
            props.showAlert("Invalid Credentials", 'danger');
        }
    };

    const handleAdminSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${host}/api/serviceProvider/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();

        if (json.token) {
            localStorage.setItem('adminToken', json.token);
            toast.success("Logged in Successfully");
            props.showAlert("Logged in Successfully", "success");
            navigate('/');
        } else {
            toast.error("Invalid Credentials of admin");
            props.showAlert("Invalid Credentials", 'danger');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleStudentClick = () => {
        setStudent(true);
        setAdmin(false);
        setTruth(false);
    };

    const handleAdminClick = () => {
        setAdmin(true);
        setStudent(false);
        setTruth(false);
    };

    return (
        <div className="container">
            <ToastContainer position="top-right" style={{ marginTop: '5rem' }} />
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-key">
                    {/* <i class="fa-solid fa-key"></i> */}
                        {/* <i className="fa fa-key" aria-hidden="true"></i> */}
                        <i class="fa-solid fa-key fa-shake"></i>
                    </div>
                    <div className="col-lg-12 login-title">
                        Login
                    </div>
                    <div className="col-lg-12 login-form">
                        {truth && (
                            <div className="d-flex justify-content-center" style={{marginBottom:'20px'}}>
                                <button className="btn btn-warning mx-3" onClick={handleStudentClick}>Login as Student</button>
                                <button className="btn btn-warning" onClick={handleAdminClick}>Login as Admin</button>
                            </div>
                        )}
                        {student && (
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">Email</label>
                                        <input type="text" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Password</label>
                                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text"></div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        {admin && (
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleAdminSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">Email Admin</label>
                                        <input type="text" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Password Admin</label>
                                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text"></div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
    );
};

export default Login;


