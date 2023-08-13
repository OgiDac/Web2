import { useContext, useEffect, useState } from "react";
import userService from "../../services/userService";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { convertImage } from "../../helpers/helpers";
import { Alert } from "@mui/material";
import AlertContext from "../../contexts/AlertContext";

const Profile = () => {
  const alertContex = useContext(AlertContext)
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    newPassword: "",
    email: "",
    fullName: "",
    birthday: "",
    address: "",
    image: "",
    imageFile: "",
  });

  useEffect(() => {
    userService.getUser().then((res) => {
        console.log(res)
      setData({ ...data, ...res, birthday: res.birthday.split("T")[0] });
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!data.username) {
      validationErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(data.username)) {
      validationErrors.username = "Username can only contain alphanumeric characters";
    } else if (data.username.length > 100) {
      validationErrors.username = "Username cannot exceed 100 characters";
    }

    if (data.password && data.password.length > 100) {
      validationErrors.password = "Password cannot exceed 100 characters";
    }

    if (data.newPassword && data.newPassword.length > 100) {
      validationErrors.newPassword = "New Password cannot exceed 100 characters";
    }

    if (!data.email) {
      validationErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      validationErrors.email = "Invalid email address";
    } else if (data.email.length > 100) {
      validationErrors.email = "Email cannot exceed 100 characters";
    }

    if (!data.fullName) {
      validationErrors.fullName = "Full Name is required";
    } else if (data.fullName.length > 100) {
      validationErrors.fullName = "Full Name cannot exceed 100 characters";
    }

    if (!data.birthday) {
      validationErrors.birthday = "Birthday is required";
    }

    if (!data.address) {
      validationErrors.address = "Address is required";
    } else if (data.address.length > 100) {
      validationErrors.address = "Address cannot exceed 100 characters";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    const formData = new FormData();
    for (const prop in data) {
      formData.append(prop, data[prop]);
    }
    console.log(formData)
    userService
      .setUser(formData)
      .then((res) => {
        alertContex.setOpen(true)
        alertContex.setMessage("Successfully changed!");
        alertContex.setSeverity("success")
      })
      .catch((e) => {
        console.log(e);
        return;
      });
    navigate("/home");
  };
  return (
    <div>
      <h2 className={classes.heading}>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label className={classes.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.username && (
            <span className={classes.error}>{errors.username}</span>
          )}
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
          {errors.password && (
            <span className={classes.error}>{errors.password}</span>
          )}
        </div>
        <div>
          <label className={classes.label}>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={data.newPassword}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.newPassword && (
            <span className={classes.error}>{errors.newPassword}</span>
          )}
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
          {errors.email && (
            <span className={classes.error}>{errors.email}</span>
          )}
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
          {errors.fullName && (
            <span className={classes.error}>{errors.fullName}</span>
          )}
        </div>
        <div>
          <label className={classes.label}>Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={data.birthday}
            onChange={handleChange}
            className={classes.input}
            min="1900-01-01"
            max={`${new Date().getFullYear() - 18}-01-01`}
          />
          {errors.birthday && (
            <span className={classes.error}>{errors.birthday}</span>
          )}
        </div>
        <div>
          <label className={classes.label}>Address:</label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
            className={classes.textarea}
          />
          {errors.address && (
            <span className={classes.error}>{errors.address}</span>
          )}
        </div>
        <div>
          <img
            title="Image"
            alt="Add"
            src={
              data.imageFile
                ? URL.createObjectURL(data.imageFile)
                : data.image && convertImage(data.image)
            }
            className={classes.image}
          />
        </div>
        <div>
          <input
            type="file"
            name="imageFile"
            accept="image/jpg"
            onChange={(e) => {
              setData({ ...data, imageFile: e.target.files[0] });
            }}
            className={classes.fileInput}
          />
        </div>
        <button type="submit" className={classes.submitButton}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
