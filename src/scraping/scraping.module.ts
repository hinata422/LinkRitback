import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { RitsumeikanStrategy } from './strategies/ritsumeikan.strategy';

@Module({
  providers: [ScrapingService, RitsumeikanStrategy],
  exports: [ScrapingService],
})
export class ScrapingModule {}
