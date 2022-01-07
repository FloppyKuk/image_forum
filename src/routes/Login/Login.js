import React, { useState } from "react";
import "./login.scss";
import axios from 'axios';

const Input = ({ name, type, value, handleChange }) => {
    return (
        <input
        placeholder={`Введите ${name}`}
            name={name}
            type={type}
            value={value.name}
            onChange={e => handleChange(e)}
        />
    )
}

const Login = ({setIsAuth, setToken}) => {

    const [loader, setLoader] = useState(false)

    const [userAuthData, setUserAutnData] = useState({
        login: '',
        password: '',
    })

    const inputLogin = [
        { name: "login", type: "text" },
        { name: "password", type: "password" },
    ]

    const handleInputData = (e) => {
        setUserAutnData(prev => ({...prev, [e.target.name] : e.target.value}))
    }

    const autorization = async () => {
        try {
            setLoader(prev => !prev)
            const serverMessage =  await axios.post('http://localhost:5000/auth/login', userAuthData);
            console.log(serverMessage.data.token)
            if(!!serverMessage.data.token){
                setToken(serverMessage.data.token)
                setIsAuth(prev => (!prev))
            }
          } catch (e) {
            console.log(e)
          }
          setLoader(prev => !prev)
      
    }

    return (
        <div className="login">
        <h2>Авторизация</h2>
            {inputLogin.map(item => (
                <Input key = {item.name + item.id} name = {item.name} type = {item.type} value = {userAuthData} handleChange={handleInputData}/>
            ))}
            <button onClick={() => autorization()}>
                Войти
            </button>
        </div>
    )
}

export default Login