import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmojiApiService {
  private readonly baseUrl = 'https://emoji-api.com';
  private readonly accessKey = 'ea7b098ee2cb7f9410048d73e053ce08b2cb1f4e';
  private allEmojis: any[] | null = null;
  private categoryGroupedEmojis: { [category: string]: any[] } | null = null;
  private categoryAndSubcategoryGroupedEmojis: { [category: string]: { [subcategory: string]: any[] } } | null = null;

  constructor(private http: HttpClient) {}

  getCategoryGroupedEmojis(): { [category: string]: any[] } | null {
    return this.categoryGroupedEmojis;
  }

  getAllEmoji(): Observable<any[]> {
    if (this.allEmojis) {
      return of(this.allEmojis);
    }

    return this.http.get<any[]>(`${this.baseUrl}/emojis`, {
      params: { access_key: this.accessKey }
    }).pipe(
      map(emojis => emojis.filter(emoji => !emoji.unicodeName.toLowerCase().includes('skin'))),
      tap(filteredEmojis => this.allEmojis = filteredEmojis)
    );
  }

  getAllEmojiGroupedByCategory(): Observable<{ [category: string]: any[] }> {
    if (this.categoryGroupedEmojis) {
      return of(this.categoryGroupedEmojis);
    }

    return this.getAllEmoji().pipe(
      map(emojis => this.groupEmojisByCategory(emojis)),
      tap(grouped => this.categoryGroupedEmojis = grouped)
    );
  }

  getAllEmojiGroupedByCategoryAndSubcategory(): Observable<{ [category: string]: { [subcategory: string]: any[] } }> {
    if (this.categoryAndSubcategoryGroupedEmojis) {
      return of(this.categoryAndSubcategoryGroupedEmojis);
    }

    return this.getAllEmoji().pipe(
      map(emojis => this.groupEmojisByCategoryAndSubcategory(emojis)),
      tap(grouped => this.categoryAndSubcategoryGroupedEmojis = grouped)
    );
  }

  private groupEmojisByCategory(emojis: any[]): { [category: string]: any[] } {
    return emojis.reduce((groups, emoji) => {
      const category = emoji.group || 'Uncategorized';

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(emoji);

      return groups;
    }, {} as { [category: string]: any[] });
  }

  private groupEmojisByCategoryAndSubcategory(emojis: any[]): { [category: string]: { [subcategory: string]: any[] } } {
    return emojis.reduce((groups, emoji) => {
      const category = emoji.group || 'Uncategorized';
      const subcategory = emoji.subGroup || 'General';

      if (!groups[category]) {
        groups[category] = {};
      }

      if (!groups[category][subcategory]) {
        groups[category][subcategory] = [];
      }

      groups[category][subcategory].push(emoji);

      return groups;
    }, {} as { [category: string]: { [subcategory: string]: any[] } });
  }
}
