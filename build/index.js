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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const graphql_import_1 = require("graphql-import");
const graphql_tools_1 = require("graphql-tools");
const jwt = __importStar(require("jsonwebtoken"));
// database connection function
const db_1 = __importDefault(require("./helpers/db"));
// graphql resolvers
const index_1 = __importDefault(require("./graphql/resolvers/index"));
// dotenv setup
dotenv_1.default.config();
// express app
const app = express_1.default();
// database connection
db_1.default({ db: process.env.DB_URI });
// graphql type definition
const typeDefs = graphql_import_1.importSchema("src/graphql/schema.graphql");
// make schema that includes our resolvers and typeDefs
const schema = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers: index_1.default });
// apollo server
const server = new apollo_server_express_1.ApolloServer({
    schema,
    context: ({ req }) => ({
        activeUser: req ? req.headers.activeUser : null
    }),
    introspection: true,
    playground: true
});
// authorization middleware
app.use((req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization;
    if (token && token !== "null") {
        try {
            const activeUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.headers.activeUser = activeUser;
        }
        catch (error) {
            console.error(error);
        }
    }
    next();
});
app.use((req, res, next) => {
    if (req.path !== "/graphql") {
        res.redirect("/graphql");
    }
    next();
});
// applying express server as a middleware to the apollo server
server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
        origin: true,
        credentials: true
    }
});
// starting server on port 4000
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started onn port ${process.env.PORT || 4000}`);
});
//# sourceMappingURL=index.js.map