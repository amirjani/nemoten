import { Module } from "@nestjs/common";
import { TenancyModule } from "../tenancy/tenancy.module";
import { Country, CountrySchema } from "./country.schema";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";

@Module({
  imports: [
    TenancyModule.forFeature([
      {
        name: "Country",
        schema: CountrySchema
      }
    ])
  ],
  providers: [ CountryService ],
  controllers: [ CountryController ]
})
export class CountryModule {}