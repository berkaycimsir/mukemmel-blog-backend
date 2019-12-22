import * as bcrypt from "bcrypt";
import { IMutationType } from "../../../@types/ResolverTypes";
import { IUserMutationResolverReturnType } from "../../../@types/ReturnTypes";
import User, { IUser } from "../../../models/User";
import token from "../../../helpers/token";

export const userMutation: IMutationType = {
  register: async (_, { data }): Promise<IUserMutationResolverReturnType> => {
    const {
      name,
      surname,
      username,
      email,
      password,
      gender
    }: {
      name: string;
      surname: string;
      username: string;
      email: string;
      password: string;
      gender: string;
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
        token: {
          token: null
        },
        errorMessage: "User already exists."
      };
    }

    if (authUsername) {
      return {
        token: {
          token: null
        },
        errorMessage: "Username is already taken."
      };
    }

    if (authEmail) {
      return {
        token: {
          token: null
        },
        errorMessage: "Email is already taken."
      };
    }

    const hashedPassword: string = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      surname,
      username,
      email,
      password: hashedPassword,
      gender
    });

    return {
      token: {
        token: token.generate(newUser, "12h")
      },
      errorMessage: "No error."
    };
  },
  login: async (_, { data }): Promise<IUserMutationResolverReturnType> => {
    const {
      username,
      password
    }: {
      username: string;
      password: string;
    } = data;

    const user: IUser = await User.findOne({ username });

    if (!user) {
      return {
        token: {
          token: null
        },
        errorMessage: "This user does not exists."
      };
    }

    const validPassword: boolean = bcrypt.compareSync(password, user.password);

    if (validPassword === false) {
      return {
        token: {
          token: null
        },
        errorMessage: "Your password is not correct."
      };
    }

    return {
      token: {
        token: token.generate(user, "12h")
      },
      errorMessage: "No error."
    };
  }
};
