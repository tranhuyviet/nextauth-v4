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
}

export type IUserDocument = Document &
  IUser & {
    save: () => Promise<IUserDocument>;
    hashPassword: (password: string) => Promise<void>;
  };
