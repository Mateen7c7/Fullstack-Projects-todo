// import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { account, databases } from "../appwrit";
import { ID } from "appwrite";
import { motion } from "framer-motion";

const databaseId = import.meta.env.VITE_TODO_DATABASE_ID;
const dataCollectionId = import.meta.env.VITE_DATA_COLLECTION_ID;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    const promise = account.create(ID.unique(), email, password);
    promise.then(
      function (responses) {
        console.log(responses);
        const promise = databases.createDocument(
          databaseId,
          dataCollectionId,
          ID.unique(),
          {
            user_id: responses.$id,
            // user_tasks: [],
          }
        );

        promise.then(
          function (response) {
            console.log(response);
            setSuccess(true);
          },
          function (error) {
            console.log(error);
          }
        );
      },
      function (error) {
        console.log(error);
      }
    );
  };
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      {success && (
        <motion.div
          className="absolute top-5 right-20 bg-green-400 text-white px-4 rounded-md"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-sm font-bold">Account Created Sucessfully!!</h1>
          <h1 className="text-sm font-bold">Pleace LOG IN to continue</h1>
        </motion.div>
      )}
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
            Sign Up
          </h3>
        </div>
        <h1 className="text-white font-semibold text-center">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-red-500">
            {" "}
            Log In
          </a>{" "}
        </h1>
      </div>
    </div>
  );
}
