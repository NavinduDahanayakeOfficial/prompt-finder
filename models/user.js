import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
   email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
   },
   username: {
      type: String,
      required: [true, "Username is required"],
      match: [
         /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
         "Username is invalid, it must be between 8-20 characters long and can only contain letters, numbers, underscores, and periods",
      ],
   },
   image: {
      type: String,
   },
});

//mongoose has the models stored in a cache, so we need to check if the model is already defined

const User = models.User || model("User", UserSchema); // if the model is already defined, use it, otherwise create a new model

export default User;
