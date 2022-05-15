import mongoose, { ConnectOptions } from "mongoose";

const connectDB = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
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
        "Connected to Distribution API Database - Initial Connection"
      );
    })
    .catch((err) => {
      console.log(
        `Initial Distribution API Database connection error occured -`,
        err
      );
    });

  return handler(req, res);
};

export default connectDB;
