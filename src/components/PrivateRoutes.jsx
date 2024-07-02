import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store";
import { account } from "../appwrit";
import { useEffect } from "react";

export default function PrivateRoutes() {
  const userId = useStore((state) => state.userId);
  const setUserId = useStore((state) => state.setUserId);

  const cookie = window.localStorage?.getItem("cookieFallback");

  useEffect(() => {
    if (cookie?.length > 10) {
      const promise = account.get();
      promise.then(
        function (response) {
          setUserId(response.$id);
        },
        function (error) {
          console.log(error);
        }
      );
    }
  }, [setUserId, cookie]);

  return userId ? <Outlet /> : <Navigate to="/login" />;
}
