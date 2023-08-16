import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import classes from './Login.module.css'
import AlertContext from "../../contexts/AlertContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const alertContex = useContext(AlertContext)

    const [loginForm, setLoginForm] = useState({
        email:"",
        password:"",
      });
      const context = useContext(AuthContext);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!loginForm.email || !loginForm.password) {
          alertContex.setOpen(true)
        alertContex.setMessage("All fields required.");
        alertContex.setSeverity("info")
          return;
        }
        await context.onLogin(loginForm);
      };

      const handleGoogleSignIn = async (e) => {
        try {
          await context.googleLogin(e);
          alertContex.setOpen(true)
        alertContex.setMessage("Loged in successfully.");
        alertContex.setSeverity("success")
        }
        catch(e) {
          
        }
      }

    return (
        <div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <label className={classes.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className={classes.input}
            />
          </div>
          <div>
            <label className={classes.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className={classes.input}
            />
          </div>
          <button type="submit" className={classes.submitButton}>Login</button>
        </form>
        <p className={classes.paragraph}>
          {"You don't have an account? "}
          <Link to={"/register"} className={classes.link}>Register</Link>
        </p>
        <div>
        <GoogleLogin onSuccess={handleGoogleSignIn} onError={e => alert("Invalid google email.")}/>
      </div>
      </div>
    )
}

export default Login;
