import { USER_INFO } from "@/constant/cookiesKeys";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }) {
  //   console.log(hasCookie(USER_INFO), "asdf");
  if (hasCookie(USER_INFO, { cookies })) {
    redirect("/");
  }

  return <section>{children}</section>;
}
