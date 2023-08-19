import Input from "@/components/InputBox/Input";
import Image from "next/image";
import { useCallback, useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [variant, setVariant] = useState<string>("login");

  const toggleVariant = useCallback(() => {
    setVariant((variant) => (variant === "login" ? "register" : "login"));
  }, []);

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
            <button className="bg-red-600 py-3 text-white w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Sign In" : "Sign Up"}
            </button>
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
