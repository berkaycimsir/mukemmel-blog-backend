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
      gender,
      admin
    }: {
      name: string;
      surname: string;
      username: string;
      email: string;
      password: string;
      gender: string;
      admin: boolean;
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
      gender,
      admin
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
  },
  update: async (parent, { data }): Promise<boolean> => {
    const {
      id,
      name,
      surname,
      username,
      email,
      gender
    }: {
      id: string;
      name: string;
      surname: string;
      username: string;
      email: string;
      gender: string;
    } = data;

    const user: IUser = await User.findById(id);

    if (!user) {
      return false;
    }

    const newUserData: { [key: string]: any } = {
      name: name ? name : user.name,
      surname: surname ? surname : user.surname,
      username: username ? username : user.username,
      email: email ? email : user.email,
      password: user.password,
      gender: gender ? gender : user.gender,
      admin: user.admin,
      createdAt: user.createdAt
    };

    await User.findByIdAndUpdate(id, newUserData);

    return true;
  }
};
