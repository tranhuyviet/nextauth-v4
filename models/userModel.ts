import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model, models, Types } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
      default: undefined,
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      default: "credentials",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    banned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// function hash password before store to database
userSchema.methods.hashPassword = function hashPassword(password: string) {
  this.password = bcrypt.hashSync(password, 12);
};

// function compare input password and password in db, return true if match and false if not match
userSchema.methods.isValidPassword = function isValidPassword(
  password: string
): boolean {
  return bcrypt.compareSync(password, this.password);
};

// function return infomation of logged in user
userSchema.methods.returnAuthUser = function returnAuthUser() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    image: this.image,
    provider: this.provider,
    role: this.role,
    banned: this.banned,
  };
};

const User = models.users || model("users", userSchema);

export default User;
