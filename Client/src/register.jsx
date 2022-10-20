import React, { useState } from "react";
import { useEffect } from "react";
import logo from "./bg.jpg";
// import axios from "axios";
import "./index.css";
// import { json } from "express";

const Register = () => {
  const [inputValue, setinputValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, seterrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [allentry, setallentry] = useState([]);

  const [fetchdata, setfetchdata] = useState([]);
  

  const getData = async () => {
    const res = await fetch("/users");
    setfetchdata(await res.json());
  };

  useEffect(() => {
    getData();
  }, [fetchdata]);

  
  const logg = fetchdata;

  

  let { firstname, lastname, email, password, confirmpassword } = inputValue;

  //using backend
  const PostData = async () => {

    const resp = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
      }),
    });

    const response = await resp.json();
    if (response.status === 422 || !response) {
      console.log("invalid registration");
    } else {
      console.log("Successfully registered");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setinputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterrors(validate(inputValue));
    setisSubmit(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      allentry.push({ firstname, lastname, email, password, confirmpassword });
      setallentry(allentry);
      PostData();
      setinputValue({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
    }

  }, [errors]);


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email-address is required!";
    }
    else if(regex.test(values.email)===false){
      errors.email="This is'nt a valid email address"
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (values.password !== values.confirmpassword) {
      errors.password = "Password does not match";
      errors.confirmpassword = "Password does not match";
    }
    if (logg.some((el)=> el.email===values.email)) {
      errors.email = "already existed, try anotherone";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Password is required!";
    }

    return errors;
  };    
  
  
  const Submitcheck = () => { 
    if(Object.keys(errors).length === 0 && isSubmit){
      return <div className="bg-green-100 rounded-md p-3 flex mt- items-center text-green-700 pt- font-bold text-[1rem] text-center">
        You have been successfully registered!
      </div>
    }
    else{
      return <div className="hidden"></div>
    }
  }
  
    
    
    

  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-blue-600 hidden lg:block md:w-1/2 xl:w-2/3  h-screen">
          <img src={logo} alt="" className="w-screen h-[135vh] object-cover" />
        </div>

        <div className="backdrop-blur-sm md:backdrop-blur-lg bg-white flex justify-center items-center  md:mx-auto md:max-w-sm lg:max-w-full w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12">
          <div className="w-screen h-screen pt-8">
            <h1 className="text-3xl font-black uppercase font-mono pb-2">
              phoneshop
            </h1>
            <h1 className="text-xl font-bold leading-tight mt-12 md:text-2xl">
              Register Yourself
            </h1>

            <form
              className="mt-6"
              action="/register"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="" className="block text-gray-700">
                  First Name
                </label>
                <input
                  type="name"
                  placeholder="First name"
                  className="w-full bg-gray-200 mt-2 border rounded-lg px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete="off"
                  autoFocus
                  // required
                  name="firstname"
                  value={inputValue.firstname}
                  onChange={handleChange}
                />
              </div>

              <p className="text-sm text-red-500 px-1 py-1">
                {errors.firstname}
              </p>

              <div className="mt-4">
                <label htmlFor="" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="name"
                  placeholder="Last name"
                  className="w-full bg-gray-200 mt-2 border rounded-lg px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete="off"
                  autoFocus
                  // required
                  name="lastname"
                  value={inputValue.lastname}
                  onChange={handleChange}
                />
              </div>

              <p className="text-sm text-red-500 px-1 py-1">
                {errors.lastname}
              </p>

              <div className="mt-4">
                <label htmlFor="" className="block text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="kamran@example.com"
                  className="w-full bg-gray-200 mt-2 border rounded-lg px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete="off"
                  autoFocus
                  // required
                  name="email"
                  value={inputValue.email}
                  onChange={handleChange}
                />
              </div>

              <p className="text-sm text-red-500 px-1 py-1">{errors.email}</p>

              <div className="mt-4">
                <label htmlFor="" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full bg-gray-200 mt-2 border rounded-lg px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete="off"
                  autoFocus
                  // required
                  name="password"
                  value={inputValue.password}
                  onChange={handleChange}
                />
              </div>
              <p className="text-sm text-red-500 px-1 py-1">
                {errors.password}
              </p>

              <div className="mt-4">
                <label htmlFor="" className="block text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full bg-gray-200 mt-2 border rounded-lg px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete="off"
                  autoFocus
                  // required
                  name="confirmpassword"
                  value={inputValue.confirmpassword}
                  onChange={handleChange}
                />
              </div>

              <p className="text-sm text-red-500 px-1 py-1">
                {errors.password}
              </p>

              <div className="text-right mt-2">
                <a
                  href=" "
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700 focus:outline-none"
                >
                  Forget Password ?
                </a>
              </div>
              
              <div>
                {Submitcheck()}
              </div>
              
              
              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-blue-400 focus:outline-none"
              >
                Sign-up
              </button>

              <hr className="my-6 border-gray-300 w-full" />

              <button
                type="button"
                className="w-full block bg-white border-gray-300 hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border  "
              >
                <div className="flex items-center justify-center">
                  <i className="fa-google fa-brands "></i>
                  <span className="ml-4">Log in with Google</span>
                </div>
              </button>
              
              
              

              <p className="text-sm text-gray-500 mt-12 pb-1">
                &copy; 2022 Kamran Mughals - All Rights Reserved
              </p>
            </form>
          </div>
        </div>
      </section> 
      
    </>
  );
};

export default Register;
