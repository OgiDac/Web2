
import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";

const Container = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Register />} />
        </Routes>
    )
}

export default Container;