import { Injectable } from '@nestjs/common';
import { InjectTenancyModel } from "../tenancy/decorator";
import { Language, LanguageDocument } from "./language.schema";
import { Model, Document } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>
  ) {
    console.log("LanguageService Invoked!");
  }

  GetTenancyModel<T extends Document> (name: string, model: Model<T>, dbname: string) : Model<T> {
    return model.db.useDb(dbname, {useCache: true}).model(name, model.schema);
  }

  async create() {


    const language: Partial<Language> = {
      isoCode: {
        primary: 'fa',
        secondary: 'fas'
      },
      name: 'farsi',
      nativeName: 'فارسی'
    }

    // console.log("LANGUAGE CREATED");
    
    const dbs = ['Fabizi_2004', 'Fabizi_2005', 'Fabizi_2006','Fabizi_2007' ,'Fabizi_2008', 'Fabizi_2009', 'Fabizi_2010'];
    const random = Math.floor(Math.random() * dbs.length);

    return await this.GetTenancyModel(Language.name, this.languageModel, dbs[random]).create(language as Language);
  }
}