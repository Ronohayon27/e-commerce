import React from "react";
import { SignupForm } from "@/components/login/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
