import { Controller, Get } from '@nestjs/common';
import { ScrapingService } from './scraping.service';

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Get('top-sellers')
  async getTopSellers() {
    return await this.scrapingService.getTopSellers();
  }
}