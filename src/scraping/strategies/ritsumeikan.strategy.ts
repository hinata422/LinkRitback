import { Injectable, Logger } from '@nestjs/common';
import { IScraperStrategy } from '../interfaces/scraper-strategy.interface';
import { CreateEventPostDto } from '../dto/event-post.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RitsumeikanStrategy implements IScraperStrategy {
  private readonly logger = new Logger(RitsumeikanStrategy.name);
  private readonly SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';

  canScrape(url: string): boolean {
    return url.includes('ritsumei.ac.jp');
  }

  async scrape(url: string): Promise<CreateEventPostDto[]> {
    this.logger.log(`Start scraping: ${url}`);

    try {
      const { data } = await axios.get<string>(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });

      const $ = cheerio.load(data);
      const events: CreateEventPostDto[] = [];
      const now = new Date();

      $('a').each((_index, element) => {
        const linkElement = $(element);
        const title = linkElement.text().trim();
        const href = linkElement.attr('href');

        // 1. 基本チェック
        if (!title || title.length < 5 || !href) return;

        // 2. 除外キーワード (ここを強化しました！)
        const ignoreWords = [
          '一覧',
          '検索',
          'カテゴリ',
          'アーカイブ',
          'HOME',
          'Top',
          '講義・講座',
          'すべての',
          'キャンパス',
        ];
        if (ignoreWords.some((word) => title.includes(word))) return;

        // 3. URLチェック (不要なパラメータ付きを除外)
        if (
          href.includes('tag=') ||
          href.includes('year=') ||
          href.includes('cat=') ||
          href.endsWith('.pdf')
        )
          return;

        // イベント詳細っぽいURLだけを通す
        if (
          !href.includes('event') &&
          !href.includes('news') &&
          !href.includes('detail')
        )
          return;

        // URLの補完
        const fullLink = href.startsWith('http')
          ? href
          : href.startsWith('/')
            ? `https://www.ritsumei.ac.jp${href}`
            : `https://www.ritsumei.ac.jp/${href}`;

        // 4. 日付抽出の強化
        // リンクの親要素や、その近くにある日付を探す
        // パターン: 2024.12.20 や 2024/12/20
        let dateText = '';
        const parent = linkElement.parent();
        const nearbyText =
          parent.text() + parent.prev().text() + parent.next().text(); // 前後も含めて探す

        const dateMatch = nearbyText.match(
          /(\d{4})[./-](\d{1,2})[./-](\d{1,2})/,
        );

        let eventDate = now;
        if (dateMatch) {
          dateText = dateMatch[0];
          eventDate = new Date(
            parseInt(dateMatch[1]),
            parseInt(dateMatch[2]) - 1,
            parseInt(dateMatch[3]),
          );
        } else {
          // 日付が見つからないイベントは信頼性が低いので今回はスキップする（設定による）
          // 今回は「日付不明」として保存は許可します
        }

        const eventDto: CreateEventPostDto = {
          id: uuidv4(),
          uid: this.SYSTEM_USER_ID,
          title: title.substring(0, 100),
          category: 'University Event',
          postTime: eventDate,
          postLimit: new Date(
            new Date(eventDate).setDate(eventDate.getDate() + 30),
          ),
          place: '立命館大学 (詳細はリンク参照)',
          detail: `【イベント検出】\n📅 日付: ${dateText || 'サイトで確認してください'}\n🔗 詳細URL: ${fullLink}`,
          chatRoomId: uuidv4(),
        };

        events.push(eventDto);
      });

      // タイトルでの重複排除
      const uniqueEvents = Array.from(
        new Map(events.map((e) => [e.title, e])).values(),
      );

      this.logger.log(`Found ${uniqueEvents.length} valid events.`);
      return uniqueEvents;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Scraping failed: ${error.message}`);
      }
      throw error;
    }
  }
}
