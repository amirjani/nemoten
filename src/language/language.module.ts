import { Module } from "@nestjs/common";
import { TenancyModule } from "../tenancy/tenancy.module";
import { Language, LanguageSchema } from "./language.schema";
import { LanguageService } from "./language.service";
import { LanguageController } from "./language.controller";

@Module({
  imports: [
    TenancyModule.forFeature([
      {
        name: "Language",
        schema: LanguageSchema
      }
    ])
  ],
  providers: [ LanguageService ],
  controllers: [ LanguageController ]
})
export class LanguageModule {}