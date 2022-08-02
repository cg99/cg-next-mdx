import mongoose, { ConnectOptions } from "mongoose";

const db = async () => {
  if (mongoose.connections[0].readyState) {
    return mongoose;
  }
  // Use new db connection
  await mongoose
    .connect(process.env.MONGO_URI!, {
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
      // useNewUrlParser: true,
    } as ConnectOptions)
    .then((res) => {
      console.log(
        "Connected to Distribution API Database - Initial Connection - single post"
      );
    })
    .catch((err) => {
      console.log(
        `Initial Distribution API Database connection error occured - single post -`,
        err
      );
    });

  return mongoose;
};

export default db;
