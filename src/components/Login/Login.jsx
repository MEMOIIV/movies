import React, { useState } from "react";
import Joi from 'joi'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import loginCss from "./login.module.css"
export default function Login() {

  const navigate = useNavigate()


  const [joiErrors, setJoiErrors] = useState({});

  // Authentication - Authorization \\
  
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });
  
  function getDataUsr(e) {

    let input_Value = e.target.value;
    let propertyName =  e.target.id; // => include id toString

    let newUser = {...dataUser} 
    newUser[propertyName] = input_Value;
    setDataUser(newUser);
    
  };

  function submitUser(e) {
    e.preventDefault();
    
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "string.empty": "Email is required.",
        "string.email": "Please enter a valid email address.",
      }),
      password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,10}$/).required().messages({
        "string.empty": "Password is required.",
        "string.pattern.base": "Password must be 6-10 characters long and include uppercase, lowercase letters, and numbers.",
      }),
    });

    let joiResponse = schema.validate(dataUser, { abortEarly: false });
    
    if (joiResponse.error === undefined) {
      // إذا كانت البيانات صالحة، أرسلها إلى الخادم
      sendDataUser();
      clr();
      setJoiErrors({}); // مسح الأخطاء عند نجاح التحقق
    } else {
      // تخزين الأخطاء في شكل كائن مرتبط بالحقل
      const errors = {};
      joiResponse.error.details.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      setJoiErrors(errors);
    }
  }
  async function sendDataUser() {
    // إحضار جميع المستخدمين
    axios.get("http://localhost:4000/singUp")
      .then(response => {
        // التحقق من وجود مستخدم بنفس البيانات
        const userExists = response.data.some(user => 
          user.email === dataUser.email &&
          user.password === dataUser.password
        );
  
        if (userExists) {
          // إذا كانت البيانات موجودة بالكامل لمستخدم آخر
          // alert("This user already exists. Please check the data or use other data.");
          navigate('/home')
        } else {
          // إذا لم تكن البيانات موجودة، 
          setJoiErrors({ wrong: "Invalid email or password." });
          
        }
      })
      .catch(error => {
        console.error("Error communicating with the server:", error);
        alert("An error occurred during registration. Please try again later.");
      });
  }
  
  

  function clr (){
    document.querySelector("#email").value = ''
    document.querySelector("#password").value = ''
  }

  return <>

      <form onSubmit={submitUser} className={loginCss.myRegister + " w-50 m-auto my-3 "}>

      <div className="mt-5 pt-5">
          <h4>LogIn</h4>
        <label htmlFor="email">Email : </label>
        <input
          onChange={getDataUsr}
          type="email"
          className="form-control"
          placeholder="Example@gmail.com"
          id="email"
        />
        {joiErrors.email && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.email}</p>}

        <label htmlFor="password">Password : </label>
        <input
          onChange={getDataUsr}
          type="password"
          className="form-control"
          placeholder="password"
          id="password"
        />
        {joiErrors.password && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.password}</p>}
        {joiErrors.wrong && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.wrong}</p>}
        <div className=" mt-4 text-end">
          <button className="btn btn-outline-info px-3 ">LogIn</button>
        </div>
      </div>
      </form>
    </>
  
};


