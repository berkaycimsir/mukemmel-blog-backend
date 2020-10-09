import * as bcrypt from "bcrypt";
import { IMutationType } from "../../../@types/ResolverTypes";
import { IUserMutationResolverReturnType } from "../../../@types/ReturnTypes";
import User, { IUser } from "../../../models/User";
import token from "../../../helpers/token";
import mail from "../../../helpers/sendMail";

// exports mutations of user for use
export const userMutation: IMutationType = {
  // creating a user
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

    // if there is a user with a username and mail that comes as a parameter
    const authBoth: IUser = await User.findOne({ username, email }).then(
      data => {
        return data;
      }
    );

    // if there is a user with a username that comes as a parameter
    const authUsername: IUser = await User.findOne({ username }).then(data => {
      return data;
    });

    // if there is a user with a email that comes as a parameter
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

    // hashing password by using bcrypt that comes as a parameter
    const hashedPassword: string = bcrypt.hashSync(password, 10);

    // creating a new user
    const newUser = await User.create({
      name,
      surname,
      username,
      email,
      createdAt: Date.now(),
      password: hashedPassword,
      gender,
      admin
    });

    // returns a token and error message
    return {
      token: {
        token: token.generate(newUser, "12h")
      },
      errorMessage: "No error."
    };
  },
  // logging a user
  login: async (_, { data }): Promise<IUserMutationResolverReturnType> => {
    const {
      username,
      password
    }: {
      username: string;
      password: string;
    } = data;

    // finding user with a username that comes as a parameter
    const user: IUser = await User.findOne({ username });

    // if there is no user
    if (!user) {
      return {
        token: {
          token: null
        },
        errorMessage: "This user does not exists."
      };
    }

    // compare user password with password that comes as a parameter
    const validPassword: boolean = bcrypt.compareSync(password, user.password);

    // if password is not valid
    if (validPassword === false) {
      return {
        token: {
          token: null
        },
        errorMessage: "Your password is not correct."
      };
    }

    // returns a token and error message
    return {
      token: {
        token: token.generate(user, "12h")
      },
      errorMessage: "No error."
    };
  },
  // updating a user
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

    // finding user by the given id
    const user: IUser = await User.findById(id);

    // if there is no user
    if (!user) {
      return false;
    }

    // gathering new user's data in an object
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

    // updating user
    await User.findByIdAndUpdate(id, newUserData);

    // returns success
    return true;
  },
  // sending contact mail
  sendMail: async (parent, { data }): Promise<boolean> => {
    const {
      name,
      email
    }: {
      name: string;
      email: string;
    } = data;

    // if there is no email or name it will returns false
    if (!email || !name) {
      return false;
    }

    // sending mail
    mail.send(data);

    // returns success
    return true;
  }
};
