import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmojiApiService } from '../../../../core/services/emoji-api/emoji-api.service';
import { EventService } from '../../../../core/services/events/event.service';
import { CategoryTransformPipe } from "../../../../core/pipes/category-transform.pipe";
import { EmojiCopiedMessageComponent } from '../emoji-copied-message/emoji-copied-message.component';

@Component({
  selector: 'app-emoji-list',
  standalone: true,
  imports: [CategoryTransformPipe, EmojiCopiedMessageComponent],
  templateUrl: './emoji-list.component.html',
  styleUrls: []
})
export class EmojiListComponent implements OnInit {
  @ViewChild('emojiListContainer') emojiListContainer!: ElementRef;

  groupedEmojis: { [category: string]: any[] } = {};
  filteredEmojis: { [category: string]: any[] } | null = null;
  activeCategory: string | null = null;
  isLoadingEmojis: boolean = true;

  constructor(private emojiApiService: EmojiApiService) {}

  ngOnInit(): void {
    this.emojiApiService.getAllEmojiGroupedByCategory().subscribe({
      next: groupedEmojis => {
        this.groupedEmojis = groupedEmojis;
        this.isLoadingEmojis = false;
      },
      error: err => {
        console.error('Failed to load emojis:', err);
        this.isLoadingEmojis = false;
      }
    });

    EventService.onSearchInput.subscribe((searchInput: string) => {
      this.activeCategory = null;
      this.filterEmojis(searchInput);
    });

    EventService.onCategoryClicked.subscribe((category: string | null) => {
      this.activeCategory = category;
      this.filterByCategory(category);
      this.scrollToTop();
    });
  }

  private filterEmojis(searchInput: string): void {
    if (!searchInput.trim()) {
      this.filteredEmojis = null;
      return;
    }

    const lowerInput = searchInput.toLowerCase();
    this.filteredEmojis = Object.keys(this.groupedEmojis).reduce((filtered, category) => {
      const emojis = this.groupedEmojis[category].filter(emoji =>
        emoji.unicodeName.toLowerCase().includes(lowerInput) ||
        emoji.slug.toLowerCase().includes(lowerInput)
      );

      if (emojis.length > 0) {
        filtered[category] = emojis;
      }

      return filtered;
    }, {} as { [category: string]: any[] });
  }

  private filterByCategory(category: string | null): void {
    if (!category) {
      this.filteredEmojis = null; // Show all emojis
    } else {
      this.filteredEmojis = { [category]: this.groupedEmojis[category] || [] };
    }
  }

  private scrollToTop(): void {
    if (this.emojiListContainer) {
      const element = this.emojiListContainer.nativeElement as HTMLElement;
      element.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getEmojiGroups(): { title: string; emojis: any[] }[] {
    const source = this.filteredEmojis || this.groupedEmojis;
    return Object.keys(source).map(category => ({
      title: category,
      emojis: source[category]
    }));
  }

  emojiClick(emoji: any, copiedMessage: EmojiCopiedMessageComponent): void {
    navigator.clipboard.writeText(emoji.character).then(
      () => {
        console.log('Emoji copied to clipboard!');
        copiedMessage.show(); // Show the "Copied" message
      },
      err => console.error('Failed to copy emoji:', err)
    );

    EventService.onEmojiClicked.emit(emoji);
  }
}
