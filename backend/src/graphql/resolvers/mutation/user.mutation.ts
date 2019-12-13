import * as bcrypt from "bcrypt";
import { IMutationType } from "../../../@types/ResolverTypes";
import { IUserResolverReturnType } from "../../../@types/ReturnTypes";
import User, { IUser } from "../../../models/User";

export const userMutation: IMutationType = {
  register: async (_, { data }): Promise<IUserResolverReturnType> => {
    const {
      name,
      surname,
      username,
      email,
      password
    }: {
      name: string;
      surname: string;
      username: string;
      email: string;
      password: string;
    } = data;

    const authBoth: IUser = await User.findOne({ username, email }).then(
      data => {
        return data;
      }
    );

    const authUsername: IUser = await User.findOne({ username }).then(data => {
      return data;
    });

    const authEmail: IUser = await User.findOne({ email }).then(data => {
      return data;
    });

    if (authBoth) {
      return {
        user: null,
        errorMessage: "User already exists."
      };
    }

    if (authUsername) {
      return {
        user: null,
        errorMessage: "Username is already taken."
      };
    }

    if (authEmail) {
      return {
        user: null,
        errorMessage: "Email is already taken."
      };
    }

    const hashedPassword: string = bcrypt.hashSync(password, 10);

    await User.create({
      name,
      surname,
      username,
      email,
      password: hashedPassword
    });

    const createdUser: IUser = await User.findOne({ username });

    return {
      user: createdUser,
      errorMessage: "No error."
    };
  }
};
