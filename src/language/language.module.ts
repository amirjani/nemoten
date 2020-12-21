import { Module } from "@nestjs/common";
import { TenancyModule } from "../tenancy/tenancy.module";
import { Language, LanguageSchema } from "./language.schema";
import { LanguageService } from "./language.service";
import { LanguageController } from "./language.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: "Language",
        useFactory:() => {
          console.log("ForFeatureAsync Invoked!");
          return LanguageSchema;
        }
      }
    ])

    // TenancyModule.forFeature([
    //   {
    //     name: Language.name,
    //     schema: LanguageSchema
    //   }
    // ])
  ],
  providers: [ LanguageService ],
  controllers: [ LanguageController ]
})
export class LanguageModule {}