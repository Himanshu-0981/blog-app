import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../services/auth_service";
import { useForm } from "react-hook-form";

function Login() {
  return <div>Login</div>;
}

export default Login;
