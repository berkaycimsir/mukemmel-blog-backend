import * as jwt from "jsonwebtoken";

// interface for token variable
interface ITokenType {
  [key: string]: ({ username }: any, expiresIn: string) => any;
}

const token: ITokenType = {
  /*
   * This function takes two parameters.
   * The first parameter is the user to which the token is generated,
   * and the second parameter is the value that indicates when it will expires in.
   * then function returns a string token.
   */
  generate: ({ username }: any, expiresIn: string): string => {
    return jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn });
  }
};

export default token;
