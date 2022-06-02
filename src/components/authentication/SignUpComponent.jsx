import { Alert } from "@mui/material";

import Router from "next/router";
import { useState } from "react";
import { post } from "axios";
import Link from "next/link";

export default function SignUpComponent({ allowRegistration }) {
  // User input for authentication
  const [ userInput, setUserInput ] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
  });

  const [ message, setMessage ] = useState({
    success: false,
    errorMessage: null,
    successMessage: null,
  })

  // Dynamic handleChange
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  }

  // POST Username, Password, E-mail to Authentication API.
  const handleSubmit = async (event) => {
    // Disable web refresh when submit
    event.preventDefault();

    // Submit Condition
    if (!userInput.username)
      return setMessage({ success: true, errorMessage: "กรุณากรอกชื่อผู้ใช้" })
    if (!userInput.password)
      return setMessage({ success: true, errorMessage: "กรุณากรอกรหัสผ่าน" })
    if (!userInput.confirm_password)
      return setMessage({ success: true, errorMessage: "กรุณายืนยันรหัสผ่าน" })
    if (!userInput.email)
      return setMessage({ success: true, errorMessage: "กรุณากรอกอีเมล" })
    if (userInput.password !== userInput.confirm_password)
      return setMessage({ success: true, errorMessage: "รหัสผ่านไม่ตรงกัน" })

    setMessage({ success: false, errorMessage: "", successMessage: "" });

    // if !error will do!
    if (!handleError.isError) {
      await post('/api/authentication/signup', {
        username: userInput.username,
        password: userInput.password,
        email: userInput.email,
      }).then(({ data: { success, message }}) => {
        if (success) {
          setMessage({ success: true, successMessage: message });
          Router.push('/authentication/signin')
          // clear form when success
          setUserInput({ username: "", password: "", confirm_password: "", email: "" });
          return;
        }

        return setMessage({
          success: true,
          errorMessage: message,
        });
      });
    }
  }
  return (
    <form className="flex flex-col m-8 p-12 space-y-3 border rounded-lg shadow-xl">
      <div className="flex flex-col space-x-2">
        <label>ชื่อผู้ใช้</label>
        <input
          type="text"
          name="username"
          className="border rounded-md focus:outline-none"
          value={userInput.username}
          onChange={ handleChange }
        />
      </div>
      <div className="flex flex-col space-x-2">
        <label>รหัสผ่าน</label>
        <input
          type="password"
          name="password"
          className="border rounded-md focus:outline-none"
          value={userInput.password}
          onChange={ handleChange }
        />
      </div>
      <div className="flex flex-col space-x-2">
        <label>ยืนยันรหัสผ่าน</label>
        <input
          type="password"
          name="confirm_password"
          className="border rounded-md focus:outline-none"
          value={userInput.confirm_password}
          onChange={ handleChange }
        />
      </div>
      <div className="flex flex-col space-x-2">
        <label>อีเมล</label>
        <input
          type="email"
          name="email"
          className="border rounded-md focus:outline-none"
          value={userInput.email}
          onChange={ handleChange }
        />
      </div>
      {
        message.success
        ? (
          message.errorMessage
          ? (
            <Alert severity="error">{ message.errorMessage }</Alert>
            )
            : (
            <Alert severity="success">{ message.successMessage }</Alert>
          )
        )
        : (null)
      }
      <button
        type="submit"
        className={
          (allowRegistration 
          ? "bg-green-500 hover:bg-green-600 active:bg-green-700" 
          : "bg-gray-200").concat(" border rounded-md text-white py-1.5") 
        }
        onClick={ handleSubmit }
        disabled={ !allowRegistration }
      >
        สมัครสมาชิก
      </button>
      <div className="flex flex-col justify-end">
        <Link href="/authentication/signin">
          <div>
            เป็นสมาชิกอยู่แล้ว ? {" "}
            <a className="text-blue-500 hover:cursor-pointer">เข้าสู่ระบบ</a>
          </div>
        </Link>
        <Link href="/">
          <div>
            <a className="text-blue-500 hover:cursor-pointer">กลับหน้าแรก</a>
          </div>
        </Link>
      </div>
    </form>
  )
}
