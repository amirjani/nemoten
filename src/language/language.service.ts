import { Injectable } from '@nestjs/common';
import { InjectTenancyModel } from "../tenancy/decorator/tenancy.decorator";
import { Language, LanguageDocument } from "./language.schema";
import { Model } from "mongoose";

@Injectable()
export class LanguageService {
  constructor(
    @InjectTenancyModel(Language.name) private readonly languageModel: Model<LanguageDocument>
  ) {}

  async create() {
    return "salam"
  }
}