import { Controller, Get } from "@nestjs/common";
import { CountryService } from "./country.service";

@Controller('country')
export class CountryController {
  constructor(
    private readonly languageService: CountryService
  ) {}

  @Get()
  async create() {
    return await this.languageService.create();
  }
}
