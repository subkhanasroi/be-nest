import { Document } from "mongoose";
export interface IUsers extends Document {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    profile:{
        photo_profile:string;
    };
}