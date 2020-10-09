"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// exports a function to connect to the database
exports.default = ({ db }) => {
    const databaseConnection = () => {
        // connection options
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        mongoose_1.default
            // connect to the database
            .connect(db, options)
            // if connection has success
            .then(() => {
            return console.info(`Successfully connected to database`);
        })
            // if connection has error
            .catch(error => {
            console.error("Error connecting to database");
            return process.exit(1);
        });
    };
    databaseConnection();
};
//# sourceMappingURL=db.js.map