import { jwtDecode } from "jwt-decode";

export function decodeAccessToken(token) {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}
