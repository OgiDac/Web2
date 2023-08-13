
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import AuthContext from "../../contexts/AuthContext";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import Verifications from "../Admin/Verifications/Verifications"
import MyProducts from "../Seller/AddArticle/MyProducts";

const Container = () => {
    const context = useContext(AuthContext);
    
    return (
        <Routes>
            <Route path="/" element={context.token ? <Navigate to="/home"/> : <Login />} />
            <Route path="/register" element={context.token ? <Navigate to={'/home'} /> : <Register />} />
            <Route path="/login" element={context.token ? <Navigate to={'/home'} /> : <Login />} />
            <Route path="/home" element={context.token ? <Dashboard /> : <Navigate to="/"/>} />
            <Route path="/profile" element={context.token ? <Profile /> : <Navigate to="/"/>} />

            <Route path="/verifications" element={context.token && context.type() === "Administrator" ? <Verifications /> : <Navigate to="/"/>} />
            <Route path="/my-products" element={context.token && context.type() === "Seller" ? <MyProducts /> : <Navigate to="/"/>} />
        </Routes>
    )
}

export default Container;