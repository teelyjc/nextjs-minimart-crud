import { Alert } from "@mui/material";

import Router from "next/router";
import { useState } from "react";
import { post } from "axios";
import Link from "next/link";

export default function SignInComponent() {
  // User input for authentication
  const [ userInput, setUserInput ] = useState({
    username: "",
    password: "",
  });

  const [ message, setMessage ] = useState({
    success: false,
    errorMessage: null,
    successMessage: null,
  })
  
  // Dynamic handleChange
  const handleChange = ({target: { name, value }}) => {
    setUserInput({ ...userInput, [name]: value });
  }

  // POST Username, Password to Authentication API.
  const handleSubmit = async (event) => {
    // Disable web refresh when submit
    event.preventDefault();

    // Submit Condition
    if (!userInput.username)
      return setMessage({ success: true, errorMessage: "กรุณากรอกชื่อผู้ใช้" })
    if (!userInput.password)
      return setMessage({ success: true, errorMessage: "กรุณากรอกรหัสผ่าน" })

    setMessage({ success: false, errorMessage: "", successMessage: "" });

    // if !error will do!
    if (!message.errorMessage) {
      await post('/api/authentication/signin', {
        username: userInput.username,
        password: userInput.password,
      }).then(({ data: { success, message }}) => {
        if (success) {
          setMessage({ success: true, successMessage: message });

          // clear form when success
          setUserInput({ username: "", password: "" });

          return setTimeout(() => {
            Router.push('/dashboard')
          }, 3000);
        }

        return setMessage({ success: true, errorMessage: message })
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
        className="border rounded-md text-white bg-green-500 hover:bg-green-600 active:bg-green-700 py-1.5"
        onClick={ handleSubmit }
      >
        เข้าสู่ระบบ
      </button>
      <div className="flex flex-col justify-end">
      <Link href="/authentication/signup">
        <div>
          ไม่ได้เป็นสมาชิกใช่ไหม ? {" "}
          <a className="text-blue-500 hover:cursor-pointer">
            สมัครสมากชิก
          </a>
        </div>
      </Link>
        <Link href="/">
          <div>
            <a className="text-blue-500 hover:cursor-pointer">
              กลับหน้าแรก
            </a>
          </div>
        </Link>
      </div>
    </form>
  )
}
