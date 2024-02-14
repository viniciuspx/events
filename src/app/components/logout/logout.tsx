import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setLoggedIn } from "../dashboard";

interface logout {
  path: string;
}

export const Logout: FC<logout> = ({ path }) => {
  const router = useRouter();
  const loginFailed = () => router.replace(path);
  useEffect(() => {
    loginFailed();
  }, []);
  setLoggedIn(false);
  return <></>;
};
