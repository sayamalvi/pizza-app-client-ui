"use server";
import * as cookie from "cookie";
import { cookies } from "next/headers";

export default async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  // data validation
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return {
        type: "error",
        message: error.errors[0].message,
      };
    }
    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No token was found",
      };
    }
    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    if (parsedAccessToken.accessToken) {
      cookies().set({
        name: "accessToken",
        value: parsedAccessToken.accessToken,
        expires: new Date(parsedAccessToken.expires as string),
        httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
        path: parsedAccessToken.Path ?? "/",
        domain: parsedAccessToken.Domain ?? undefined,
        sameSite: parsedAccessToken.SameSite as "strict",
      });
    }

    if (parsedRefreshToken.refreshToken) {
      cookies().set({
        name: "refreshToken",
        value: parsedRefreshToken.refreshToken,
        expires: new Date(parsedRefreshToken.expires as string),
        httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
        path: parsedRefreshToken.Path ?? "/",
        domain: parsedRefreshToken.Domain ?? undefined,
        sameSite: parsedRefreshToken.SameSite as "strict",
      });
    }

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (error: any) {
    return {
      type: "success",
      message: error.message,
    };
  }
}
