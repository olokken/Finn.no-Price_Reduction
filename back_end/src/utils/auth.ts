import { sign, verify } from "jsonwebtoken";
import { MyContext } from "src/MyContext";
import { MiddlewareFn } from "type-graphql";

export const createAcesstoken = (id: string): string => {
  return sign({ id: id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (id: string): string => {
  return sign({ id: id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

//bearer token
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const auth = context.req.headers["authorization"];
  if (!auth) {
    throw new Error("Du er ikke autorisert");
  }
  try {
    const token = auth.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload! as any;
  } catch (err) {
    throw new Error("Autoriseringen er utgått");
  }
  return next();
};
