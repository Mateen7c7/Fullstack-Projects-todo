import { Navigate } from "react-router-dom";
import useStore from "../store";
import {  useState } from "react";
import { account } from "../appwrit";

export default function Login() {
  const userId = useStore((state) => state.userId);
  const setUserId = useStore((state) => state.setUserId);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  if (userId) {
    return <Navigate to="/" />;
  }

  // handle submit
  const handleSubmit = () => {
    console.log(email, password);

    if (email && password) {
      const promise = account.createEmailPasswordSession(email, password);
      promise.then(
        function (response) {
          console.log(response);
          setUserId(response.$id);
        },
        function (error) {
          console.log(error);
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-white text-3xl font-bold">Email</h1>
        <input
          type="email"
          className="border-b-2 border-white bg-transparent outline-none text-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h1 className="text-white text-3xl font-bold">Password</h1>
        <input
          type="password"
          className="border-b-2 border-white bg-transparent outline-none text-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          onClick={handleSubmit}
          className="flex items-center justify-center  mt-5 cursor-pointer"
        >
          <h3 className="border-2 border-white rounded-full text-white font-semibold px-4 py-1 text-xl hover:text-black">
            Log In
          </h3>
        </div>
        <h1 className="text-white font-semibold text-center ">
          {"don't"} have an account?{" "}
          <a href="/signup" className="underline hover:text-red-500">
            {" "}
            Sign Up
          </a>{" "}
        </h1>
      </div>
    </div>
  );
}
