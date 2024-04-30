import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    mobile: String,
    address: String,
    urlAvatar: String,
    password: String,
    status: String,
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
