import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenancyModule } from "./tenancy/tenancy.module";
import { Request } from "express";
import { LanguageModule } from "./language/language.module";

@Module({
  imports: [
    TenancyModule.forRoot({
      tenantId: (req: Request) => req.get('tenantId'),
      options: () => ({}),
      uri: (tenantId: string) => `mongodb://localhost:27017/Fabizi_${tenantId}`
    }),
    LanguageModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
