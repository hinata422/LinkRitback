import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { RitsumeikanStrategy } from './strategies/ritsumeikan.strategy';
import { ScraperFactory } from './scraper.factory';
import { EventsModule } from '../events/events.module';
import { ScrapingController } from './scraping.controller';

@Module({
  imports: [EventsModule],
  controllers: [ScrapingController],
  providers: [ScrapingService, ScraperFactory, RitsumeikanStrategy],
  exports: [ScrapingService],
})
export class ScrapingModule {}
