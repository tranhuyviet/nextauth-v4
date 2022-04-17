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

export type IUserDocument = Document &
  IUser & {
    save: () => Promise<IUserDocument>;
    hashPassword: (password: string) => Promise<void>;
  };
