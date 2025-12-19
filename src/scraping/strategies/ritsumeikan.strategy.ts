import { Injectable, Logger } from '@nestjs/common';
import { IScraperStrategy } from '../interfaces/scraper-strategy.interface';
import { CreateEventPostDto } from '../dto/event-post.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RitsumeikanStrategy implements IScraperStrategy {
  private readonly logger = new Logger(RitsumeikanStrategy.name);
  // ※実際の運用では環境変数等で管理することを推奨
  private readonly SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';

  canScrape(url: string): boolean {
    return url.includes('ritsumei.ac.jp');
  }

  async scrape(url: string): Promise<CreateEventPostDto[]> {
    this.logger.log(`Start scraping: ${url}`);

    try {
      const { data } = await axios.get<string>(url);
      const $ = cheerio.load(data);
      const events: CreateEventPostDto[] = [];

      // サイトの構造に合わせてセレクタ（.event-itemなど）は調整が必要です
      $('.event-list__item').each((_index, element) => {
        const title = $(element).find('.event-list__title').text().trim();
        const link = $(element).find('a').attr('href');
        const detailText = $(element).find('.event-list__text').text().trim();

        if (!title) return;

        // URLが相対パスの場合は補完する
        const fullLink =
          link && !link.startsWith('http')
            ? `https://www.ritsumei.ac.jp${link}`
            : link;

        const eventDto: CreateEventPostDto = {
          id: uuidv4(),
          uid: this.SYSTEM_USER_ID,
          title: title,
          category: 'University Event',
          postTime: new Date(), // 本来はdateStrを解析して設定
          postLimit: new Date(new Date().setDate(new Date().getDate() + 30)), // 仮：30日後
          place: '立命館大学',
          detail: `${detailText}\n\n詳細URL: ${fullLink}`,
          chatRoomId: uuidv4(),
        };

        events.push(eventDto);
      });

      return events;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Scraping failed: ${error.message}`);
      } else {
        this.logger.error('Scraping failed with unknown error');
      }
      throw error;
    }
  }
}
