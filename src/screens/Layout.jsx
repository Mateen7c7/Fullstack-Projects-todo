import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[400px]  h-[95%]  rounded-lg bg-[url('/bg.png')] bg-right-bottom pt-5 max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:bg-cover">
        <h1 className="text-4xl font-bold text-white underline text-center h-[8%]">
          To do
        </h1>
        <div className="w-full h-[92%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
