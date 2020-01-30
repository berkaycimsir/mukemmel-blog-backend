import mongoose, { Mongoose } from "mongoose";

// type for db parameter
type TInput = {
  db: string;
};

// exports a function to connect to the database
export default ({ db }: TInput) => {
  const databaseConnection = () => {
    // connection options
    const options: mongoose.ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    };

    mongoose
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
