import { Injectable } from '@nestjs/common';
import { InjectTenancyModel } from "../tenancy/decorator";
import { Country, CountryDocument } from "./country.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CountryService {
  constructor(
    @InjectTenancyModel(Country.name) private readonly languageModel: Model<CountryDocument>
  ) {}

  async create() {
    const language: Partial<Country> = {
      isoCode: {
        primary: 'fa',
        secondary: 'fas'
      },
      name: 'farsi',
      nativeName: 'فارسی'
    }

    console.log("LANGUAGE CREATED");
    // @ts-ignore
    return await this.languageModel.create(language);
  }
}