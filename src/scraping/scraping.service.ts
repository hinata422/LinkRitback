import { Injectable, NotFoundException } from '@nestjs/common';
import { IScraperStrategy } from './interfaces/scraper-strategy.interface';
import { RitsumeikanStrategy } from './strategies/ritsumeikan.strategy';
import { CreateEventPostDto } from './dto/event-post.dto';

@Injectable()
export class ScrapingService {
  private strategies: IScraperStrategy[] = [];

  constructor(private readonly ritsumeikanStrategy: RitsumeikanStrategy) {
    // ここで作成したStrategyを登録します
    this.strategies.push(ritsumeikanStrategy);
  }

  async scrapeEvent(url: string): Promise<CreateEventPostDto[]> {
    const strategy = this.strategies.find((s) => s.canScrape(url));

    if (!strategy) {
      throw new NotFoundException(`No scraper strategy found for URL: ${url}`);
    }

    return strategy.scrape(url);
  }
}
