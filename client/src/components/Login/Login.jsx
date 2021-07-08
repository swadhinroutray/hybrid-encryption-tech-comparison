import React from 'react'
import './Login.css'

const Login = () => {
return(
    <div>
        <div id="login">
          <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center heading">Login</h3>
                            <div className="form-group">
                                <label for="username" className="text-info">Username:</label>
                                <input type="text" name="username" id="username" className="form-control" autoComplete="off"></input>
                            </div>
                            <div className="form-group">
                                <label for="password" className="text-info">Password:</label>
                                <input type="text" type="password" name="password" id="password" className="form-control" autoComplete="off"></input>
                            </div>
                            <div className="form-group">
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Login"></input>
                            </div>
                            <p>Note: If not registered, register first</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
);
}

export default Login
