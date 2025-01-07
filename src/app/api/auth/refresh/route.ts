import { cookies } from "next/headers";
import * as cookie from "cookie";

export async function POST() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/auth/refresh`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        Cookie: `refreshToken=${cookies().get("refreshToken")?.value}`,
      },
    }
  );
  if (!response.ok) {
    console.log("Refresh failed");
    return Response.json({ success: false });
  }
  const c = response.headers.getSetCookie();
  const accessToken = c.find((cookie) => cookie.includes("accessToken"));
  const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

  if (!accessToken || !refreshToken) {
    console.log("Refresh failed");
    return Response.json({ success: false });
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

  return Response.json({ success: true });
}
