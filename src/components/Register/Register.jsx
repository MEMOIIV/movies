import React, { useState } from "react";
import RegisterCss from "./Register.module.css";
import Joi from 'joi'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Register() {


  const navigate = useNavigate()


  const [joiErrors, setJoiErrors] = useState({});

  // Authentication - Authorization \\
  
  const [dataUser, setDataUser] = useState({
    firstName: "",
    lastName: "",
    age: 0,
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
      firstName: Joi.string().alphanum().min(3).max(10).required().messages({
        "string.empty": "First name is required.",
        "string.min": "First name must be at least 3 characters long.",
        "string.max": "First name cannot exceed 10 characters.",
      }),
      lastName: Joi.string().alphanum().min(3).max(10).required().messages({
        "string.empty": "Last name is required.",
        "string.min": "Last name must be at least 3 characters long.",
        "string.max": "Last name cannot exceed 10 characters.",
      }),
      age: Joi.number().min(18).max(60).required().messages({
        "number.base": "Age must be a number.",
        "number.min": "Age must be at least 18.",
        "number.max": "Age cannot exceed 60.",
      }),
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
      // navigate('/home')
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
    try {

    const response = await axios.get(`${process.env.PUBLIC_URL}/dp.json`)

        // التحقق من وجود مستخدم بنفس البيانات
        const userExists = response.data.some(user => 
          user.firstName === dataUser.firstName &&
          user.lastName === dataUser.lastName &&
          user.age === dataUser.age &&
          user.email === dataUser.email &&
          user.password === dataUser.password
        );
        
        
        if (userExists) {
          // إذا كانت البيانات موجودة بالكامل لمستخدم آخر
          alert("This user already exists. Please check the data or use other data.");
        } else {
          // إذا لم تكن البيانات موجودة، قم بإضافة المستخدم الجديد
          await axios.post("http://localhost:4000/singUp", dataUser)
            // .then(_postResponse => {
              // console.log(postResponse.data);
              alert("User has been registered successfully!");
            // });
        }
      }
      catch(error) {
        console.error("Error communicating with the server:", error);
        console.error("Error response:", error.response);
        alert("An error occurred during registration. Please try again later.");
      };
  }
  
  

  function clr (){
    document.querySelector("#firstName").value = ''
    document.querySelector("#lastName").value = ''
    document.querySelector("#age").value = ''
    document.querySelector("#email").value = ''
    document.querySelector("#password").value = ''
  }

  return <>

      <form onSubmit={submitUser} className={RegisterCss.myRegister + " w-50 m-auto my-3 "}>
        <h4>Registration Form</h4>
        <label htmlFor="firstName">FirstName : </label>
        <input
          onChange={getDataUsr}
          type="text"
          className="form-control"
          placeholder="First_Name"
          id="firstName"
        />
        {joiErrors.firstName && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.firstName}</p>}
        

        <label htmlFor="lastName">LastName : </label>
        <input
          onChange={getDataUsr}
          type="text"
          className="form-control"
          placeholder="Last_Name"
          id="lastName"
        />
        {joiErrors.lastName && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.lastName}</p>}

        <label htmlFor="age">Age : </label>
        <input
          onChange={getDataUsr}
          type="number"
          className="form-control"
          placeholder="age"
          id="age"
        />
        {joiErrors.age && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.age}</p>}

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
        <div className=" mt-4 text-end">
          <button className="btn btn-outline-info px-3 ">Register</button>
        </div>
      </form>
    </>
  
};


/*



import React, { useState } from "react";
import RegisterCss from "./Register.module.css";
import Joi from 'joi'
import axios from 'axios'
export default function Register() {

  const [joiErrors, setJoiErrors] = useState(null);

  // Authentication - Authorization \\
  
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [result, setResult] = useState('');
  const [resultType, setResultType] = useState('');

  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(10).required() ,
    lastName: Joi.string().alphanum().min(3).max(10).required(),
    age: Joi.number().min(18).max(60).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,10}$/i).required(),
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const {error} = schema.validate({
      firstName,
      lastName,
      age:Number(age),
      email,
      password,
    } , {abortEarly: false});

    if (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
      }));
      setJoiErrors(errors);
      setResultType('error');
      return;
    } else {
      setJoiErrors(null); // إذا كانت هناك أخطاء، قم بإعادة تعيينها عند النجاح
    };

    if(error){
      setResult(`Validation error: ${error.details[0].message}`)
      setResultType('error'); // نوع الرسالة خطأ
      return ;
    };

    try{
      const response = await axios.get("http://localhost:8000/singUp");
      const users = response.data;
      const userExists = users.some( user =>
        user.firstName === firstName &&
        user.lastName === lastName &&
        user.age === age &&
        user.email === email &&
        user.password === password
      );
      
      if (userExists) {
        setResult('User already exists!'); // رسالة إذا كان المستخدم موجودًا
        setResultType('error'); // نوع الرسالة خطأ
      } else {
        // إضافة المستخدم الجديد إلى API
        const newUser = { firstName, lastName, age, email, password };
        await axios.post('http://localhost:8000/singUp', newUser);
        setResult('User added successfully!');
        setResultType('success'); // نوع الرسالة نجاح
      };

    } catch (error) {
      console.error('Error fetching or adding users:', error);
      setResult('Error processing request');
      setResultType('error'); // نوع الرسالة خطأ
    };

    clr()
  };

  function clr (){
    document.querySelector("#firstName").value = ''
    document.querySelector("#lastName").value = ''
    document.querySelector("#age").value = ''
    document.querySelector("#email").value = ''
    document.querySelector("#password").value = ''
  }

  return <>

{joiErrors && joiErrors.map((err, index) => (
  <div key={index} className="alert alert-danger w-75 my-2 p-2 m-auto">
    {err.message}
  </div>
))}      <form onSubmit={handleSubmit} className={RegisterCss.myRegister + " w-50 m-auto my-3 "}>
        <h4>Registration Form</h4>
        <label htmlFor="firstName">FirstName : </label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          type="text"
          className="form-control"
          placeholder="First_Name"
          id="firstName"
        />
        <p></p>

        <label htmlFor="lastName">LastName : </label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          type="text"
          className="form-control"
          placeholder="Last_Name"
          id="lastName"
        />

        <label htmlFor="age">Age : </label>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          type="number"
          className="form-control"
          placeholder="age"
          id="age"
        />

        <label htmlFor="email">Email : </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          className="form-control"
          placeholder="Example@gmail.com"
          id="email"
        />

        <label htmlFor="password">Password : </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          className="form-control"
          placeholder="password"
          id="password"
        />  
              <p className={`${RegisterCss.alert} ${resultType === 'error' ? RegisterCss.error : RegisterCss.success}  text-center  my-2`}>{result}</p>
        <div className=" mt-4 text-end">
          <button className="btn btn-outline-info px-3 ">Register</button>
        </div>
      </form>
    </>
  
};




*/