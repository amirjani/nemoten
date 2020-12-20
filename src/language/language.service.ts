import { Injectable } from '@nestjs/common';
import { InjectTenancyModel } from "../tenancy/decorator";
import { Language, LanguageDocument } from "./language.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LanguageService {
  constructor(
    @InjectTenancyModel(Language.name) private readonly languageModel: Model<LanguageDocument>
  ) {}

  async create() {
    const language: Partial<Language> = {
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