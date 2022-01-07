import React from "react";
import "./autorization.scss";
import { Link, Outlet } from "react-router-dom";

const Autorization = () => {
    return (
        <div className="autorization">
            <div className="linkContainer">
                <div className="link">
                    <Link className="Link" to="login" >login</Link>
                    <Link className="Link" to="register" >register</Link>
                </div>
            </div>
            <div className="authContainer">
                <Outlet />
            </div>

        </div>
    )
}

export default Autorization