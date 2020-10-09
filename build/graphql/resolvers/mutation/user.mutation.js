"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutation = void 0;
const bcrypt = __importStar(require("bcrypt"));
const User_1 = __importDefault(require("../../../models/User"));
const token_1 = __importDefault(require("../../../helpers/token"));
const sendMail_1 = __importDefault(require("../../../helpers/sendMail"));
// exports mutations of user for use
exports.userMutation = {
    // creating a user
    register: (_, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, surname, username, email, password, gender, admin } = data;
        // if there is a user with a username and mail that comes as a parameter
        const authBoth = yield User_1.default.findOne({ username, email }).then(data => {
            return data;
        });
        // if there is a user with a username that comes as a parameter
        const authUsername = yield User_1.default.findOne({ username }).then(data => {
            return data;
        });
        // if there is a user with a email that comes as a parameter
        const authEmail = yield User_1.default.findOne({ email }).then(data => {
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
        const hashedPassword = bcrypt.hashSync(password, 10);
        // creating a new user
        const newUser = yield User_1.default.create({
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
                token: token_1.default.generate(newUser, "12h")
            },
            errorMessage: "No error."
        };
    }),
    // logging a user
    login: (_, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = data;
        // finding user with a username that comes as a parameter
        const user = yield User_1.default.findOne({ username });
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
        const validPassword = bcrypt.compareSync(password, user.password);
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
                token: token_1.default.generate(user, "12h")
            },
            errorMessage: "No error."
        };
    }),
    // updating a user
    update: (parent, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, name, surname, username, email, gender } = data;
        // finding user by the given id
        const user = yield User_1.default.findById(id);
        // if there is no user
        if (!user) {
            return false;
        }
        // gathering new user's data in an object
        const newUserData = {
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
        yield User_1.default.findByIdAndUpdate(id, newUserData);
        // returns success
        return true;
    }),
    // sending contact mail
    sendMail: (parent, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email } = data;
        // if there is no email or name it will returns false
        if (!email || !name) {
            return false;
        }
        // sending mail
        sendMail_1.default.send(data);
        // returns success
        return true;
    })
};
//# sourceMappingURL=user.mutation.js.map