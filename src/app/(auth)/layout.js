import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import { redirect } from "next/navigation";

const AuthLayout = ({ children }) => {
  const token = hasCookie(USER_TOKEN, { cookies });

  if (token) {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
