import { useState, useContext } from "react";
import classes from "../Register/Register.module.css";
import { useNavigate } from "react-router-dom";
import userService from '../../services/userService';

import AlertContext from "../../contexts/AlertContext";

const Register = () => {
  const navigate = useNavigate();
  const alertContex = useContext(AlertContext)

  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    birthday: "",
    address: "",
    type: "",
    imageFile: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!data.username) {
      validationErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(data.username)) {
      validationErrors.username = 'Username can only contain alphanumeric characters';
    } else if (data.username.length > 100) {
      validationErrors.username = 'Username cannot exceed 100 characters';
    }

    if (!data.password) {
      validationErrors.password = 'Password is required';
    } else if (data.password.length > 100) {
      validationErrors.password = 'Password cannot exceed 100 characters';
    }

    if (!data.email) {
      validationErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      validationErrors.email = 'Invalid email address';
    } else if (data.email.length > 100) {
      validationErrors.email = 'Email cannot exceed 100 characters';
    }
    
    if (!data.fullName) {
      validationErrors.fullName = 'Full Name is required';
    } else if (data.fullName.length > 100) {
      validationErrors.fullName = 'Full Name cannot exceed 100 characters';
    }
    
    if (!data.birthday) {
      validationErrors.birthday = 'Birthday is required';
    }
   
    if (!data.address) {
      validationErrors.address = 'Address is required';
    } else if (data.address.length > 200) {
      validationErrors.address = 'Address cannot exceed 200 characters';
    }
    
    if (!data.type) {
      validationErrors.type = 'User Type is required';
    }

    setErrors(validationErrors);

    // If there are no validation errors, submit the form
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    const formData = new FormData();
    for(const prop in data) {
      formData.append(prop, data[prop]);
    }

    userService.register(formData).then(res => {
      console.log(res)

      if(res === false) {
        alertContex.setOpen(true)
        alertContex.setMessage("Username and email have to be unique!!");
        alertContex.setSeverity("error")
        console.log(alertContex)
      }
      else {
        navigate("/")
      }
     })
  };

  return (
    <div>
      <h2 className={classes.heading}>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.username && <span className={classes.error}>{errors.username}</span>}
        </div>
        <div>
          <label className={classes.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.password && <span className={classes.error}>{errors.password}</span>}
        </div>
        <div>
          <label className={classes.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.email && <span className={classes.error}>{errors.email}</span>}
        </div>
        <div>
          <label className={classes.label}>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.fullName && <span className={classes.error}>{errors.fullName}</span>}
        </div>
        <div>
          <label className={classes.label}>Birthday:</label>
          <input
            type="date"
            name="birthday"
            min="1900-01-01"
            max={`${new Date().getFullYear() - 18}-01-01`}
            value={data.birthday}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.birthday && <span className={classes.error}>{errors.birthday}</span>}
        </div>
        <div>
          <label className={classes.label}>Address:</label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
            className={classes.textarea}
          />
          {errors.address && <span className={classes.error}>{errors.address}</span>}
        </div>
        <div>
          <label className={classes.label}>User Type:</label>
          <select
            name="type"
            value={data.type}
            onChange={handleChange}
            className={classes.select}
          >
            <option value="">Select a type</option>
            <option value="1">Seller</option>
            <option value="2">Buyer</option>
          </select>
          {errors.type && <span className={classes.error}>{errors.type}</span>}
        </div>
        <div>
          <img
            title="Image"
            width={200}
            height={100}
            alt="Add"
            src={data.imageFile && URL.createObjectURL(data.imageFile)}
            className={classes.image}
          />
          <span>
            <input
              type="file"
              name="imageFile"
              accept="image/jpg"
              onChange={(e) => {
                console.log(e);
                 setData({ ...data, imageFile: e.target.files[0] });
              }}
            />
          </span>
        </div>
        <button type="submit" className={classes.submitButton}>Register</button>

      </form>
    </div>
  );
};

export default Register;
