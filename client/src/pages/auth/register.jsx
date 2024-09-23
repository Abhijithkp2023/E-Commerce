import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialstate = {
  userName: "",
  email: "",
  password: ""
}

const AuthRegister = () => {

  const [formData, setFormData] = useState(initialstate)

  const onSubmit = () => {

  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight  text-foreground">
          Create New Account
        </h1>
        <p className="mt-2">Already Have an account
        <Link
          className="ml-2 font-medium text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
        </p>
      </div>
      <CommonForm
      formControls={registerFormControls}
      buttonText={'Sign up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;