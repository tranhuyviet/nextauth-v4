import User from "../models/userModel";
import { IUserDocument } from "../utils/types";

const save = async (user: IUserDocument): Promise<IUserDocument> => {
  return user.save();
};

const findUserByEmail = async (
  email: string
): Promise<IUserDocument | null> => {
  return User.findOne({ email: email.trim().toLowerCase() });
};

const updateUser = async (
  user: IUserDocument
): Promise<IUserDocument | null> => {
  return User.findOneAndUpdate({ email: user.email }, user, {
    new: true,
    runValidators: true,
  });
};

const userService = { save, findUserByEmail, updateUser };

export default userService;
