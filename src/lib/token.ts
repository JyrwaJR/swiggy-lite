import { jwtVerify, SignJWT } from "jose";
import { env } from "../env";

export const signJWT = async (payload: { sub: string }) => {
  try {
    const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN;
    const SECRET_KEY = env.JWT_SECRET_KEY;
    const secret = new TextEncoder().encode(SECRET_KEY);
    const alg = "HS256";
    const expireAt = `${JWT_EXPIRES_IN}h`;
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(expireAt)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    const stripBarrierToken = token.replace("Bearer ", "");
    return (
      await jwtVerify(
        stripBarrierToken,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY as string),
      )
    ).payload as T;
  } catch (error) {
    throw error;
  }
};
