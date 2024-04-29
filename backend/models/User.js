import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    field: "first_name",
  },
  lastName: {
    type: String,
    field: "last_name",
  },
  mobile: String,
  address: String,
  urlAvatar: {
    type: String,
    field: "url_avatar",
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
