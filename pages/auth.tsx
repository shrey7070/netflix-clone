import axios from "axios";
import Input from "@/components/InputBox/Input";
import Image from "next/image";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [variant, setVariant] = useState<string>("login");

  const toggleVariant = useCallback(() => {
    setVariant((variant) => (variant === "login" ? "register" : "login"));
  }, []);

  // login method
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  // register method
  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        name: username,
        email: email,
        password: password,
      });

      login();
    } catch (error) {
      console.error(error);
    }
  }, [email, username, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="px-12 py-5 bg-black w-full h-full lg:bg-opacity-50">
        <nav>
          <Image src="/images/logo.png" alt="logo" width={150} height={20} />
        </nav>
        <div className="flex justify-center">
          <div className=" bg-black bg-opacity-80 px-16 py-16 self-center lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Login" : "Register"}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  label="Username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                  type="email"
                  value={username}
                />
              )}
              <Input
                id="email"
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Sign In" : "Sign Up"}
            </button>
            {/* 
            Google and Github Login
            <div className="flex flex-row items-center gap-4 justify-center mt-8">
              <button
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
                className="w-10 h-10 bg-white outline-none rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
                className="w-10 h-10 bg-white outline-none rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </button>
            </div> */}
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix? "
                : "Already have an account? "}
              <span
                onClick={toggleVariant}
                className="text-white cursor-pointer hover:underline"
              >
                {variant === "login" ? "Create an Account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
