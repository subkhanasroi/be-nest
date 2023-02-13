import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
    @Prop({ required: true })
    username: string;

    @Prop()
    email: string;

    @Prop({ required: true })
    createAt: Date;

    @Prop({ required: true })
    updateAt: Date;

    @Prop()
    completedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);