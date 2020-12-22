import { Controller, Get } from "@nestjs/common";
import { LanguageService } from "./language.service";

@Controller('language')
export class LanguageController {
  constructor(
    private readonly languageService: LanguageService
  ) {}

  @Get()
  async create() {
    const dbs = ['Fabizi_22004', 'Fabizi_22005', 'Fabizi_22006','Fabizi_22007' ,'Fabizi_22008', 'Fabizi_22009', 'Fabizi_22010'];
    const random = Math.floor(Math.random() * dbs.length);
    const dbName = dbs[random];
    return await this.languageService.create(dbName);
  }
}
