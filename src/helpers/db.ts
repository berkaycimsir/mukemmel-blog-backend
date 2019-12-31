import mongoose from "mongoose";

type TInput = {
  db: string;
};

export default ({ db }: TInput) => {
  const databaseConnection = () => {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        return console.info(`Successfully connected to database`);
      })
      .catch(error => {
        console.error("Error connecting to database");
        return process.exit(1);
      });
  };

  databaseConnection();
};
