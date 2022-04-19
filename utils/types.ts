import { Document } from "mongoose";

export enum IProviders {
  "creadentials" = "credentials",
  "google" = "google",
}

export interface IErrorsObject {
  [name: string]: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
}

export interface IUserSignupBody {
  provider: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLoginBody {
  email: string;
  password: string;
  global?: string;
}

export interface IReturnAuthUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  provider: string;
  role: string;
  banned: boolean;
}

export type IUserDocument = Document &
  IReturnAuthUser & {
    banned: boolean;
    save: () => Promise<IUserDocument>;
    hashPassword: (password: string) => Promise<void>;
    isValidPassword: (password: string) => Promise<void>;
    returnAuthUser: () => IReturnAuthUser;
  };

export interface IPost {
  _id?: string;
  content: string;
  user: string;
}

export interface IPostPopulate {
  _id: string;
  content: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    image: string;
  };
}

export interface ICreatePostBody {
  content: string;
  global?: string;
}

export type IPostDocument = Document &
  IPost & {
    save: () => Promise<IPostDocument>;
  };
