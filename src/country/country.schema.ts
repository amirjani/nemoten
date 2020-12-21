import { Prop, Schema as MongooseSchema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@MongooseSchema({
  collection: 'country'
})
export class Country {
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

export type CountryDocument = Country & Document;

export const CountrySchema = SchemaFactory.createForClass(Country)
