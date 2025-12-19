import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { RitsumeikanStrategy } from './strategies/ritsumeikan.strategy';
import { ScraperFactory } from './scraper.factory';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [EventsModule],
  providers: [ScrapingService, ScraperFactory, RitsumeikanStrategy],
  exports: [ScrapingService],
})
export class ScrapingModule {}
