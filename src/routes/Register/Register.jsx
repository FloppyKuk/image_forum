import React, { useState } from "react";
import "./register.scss";
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

const Register = () => {

  const [registerData, setRegisterData] = useState({})
  const [loader, setLoader] = useState(false)

  const inputRegister = [
    { name: "email", type: "email" },
    { name: "login", type: "text" },
    { name: "password", type: "password" },
  ]

  const handleInputData = (e) => {
    setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const registration = async () => {
    try {
      setLoader(prev => !prev)
      const serverMessage =  await axios.post('http://localhost:5000/auth/registration', registerData);
      console.log(serverMessage.data)

    } catch (e) {
      console.log(e)
    }
    setLoader(prev => !prev)

  }

  return (
    <div className="register">
      <div className={loader ? 'loader' : 'loaderNone'}>Loader</div>
      <h2>Регистрация</h2>
      {inputRegister.map((item, index) => (
        <Input key = {index + item.name} name={item.name} type={item.type} value={registerData} handleChange={handleInputData} />
      ))}
      <button onClick={registration}>
        Зарегистрироваться
      </button>
    </div>
  )
}

export default Register