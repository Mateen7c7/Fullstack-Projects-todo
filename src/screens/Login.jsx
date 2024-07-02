export default function Login() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-white text-3xl font-bold">Email</h1>
        <input
          type="email"
          className="border-b-2 border-white bg-transparent outline-none text-xl"
        />
        <h1 className="text-white text-3xl font-bold">Password</h1>
        <input
          type="password"
          className="border-b-2 border-white bg-transparent outline-none text-xl"
        />
        <div className="flex items-center justify-center  mt-5 cursor-pointer">
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
