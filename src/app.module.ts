import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenancyModule } from "./tenancy/tenancy.module";
import { Request } from "express";
import { LanguageModule } from "./language/language.module";
import { CountryModule } from './country/country.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './tenancy/mongoose-tenancy.service';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/Fabizi_1`),
    // TenancyModule.forRoot({
    //   tenantId: (req: Request) => req.get('tenantId'),
    //   options: () => ({}),
    //   uri: (tenantId: string) => `mongodb://localhost:27017/Fabizi_${tenantId}`
    // }),
    LanguageModule,
    //CountryModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
