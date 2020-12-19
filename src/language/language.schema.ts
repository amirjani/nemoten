import { Prop, Schema as MongooseSchema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@MongooseSchema({
  collection: 'language'
})
export class Language {
  @Prop({
    type: {
      primary: String,
      secondary: String
    }
  })
  isoCode: {
    primary: string,
    secondary: string
  }

  @Prop({
    type: String
  })
  name: string

  @Prop({
    type: String
  })
  nativeName: string
}

export type LanguageDocument = Language & Document;

export const LanguageSchema = SchemaFactory.createForClass(Language)
