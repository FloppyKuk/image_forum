import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Autorization from "../Autorization/Autorization";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Register from "../Register/Register";


const RouterApp = () => {

    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState('');

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token])

    if (isAuth && (token.length !== 0)) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/imageForum" element={<Main />} />
                    <Route path="*" element={<Navigate replace to="/imageForum" />} />
                </Routes>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/*" element={<Autorization />} >
                        <Route path="login" element={<Login setIsAuth={setIsAuth} setToken={setToken} />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="*" element={<Navigate replace to="/auth" />} />
                </Routes>
            </BrowserRouter>

        )
    }
}

export default RouterApp