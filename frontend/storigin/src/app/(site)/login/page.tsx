import { LoginForm } from "@/components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-screen max-w-xl md:max-w-4xl px-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
