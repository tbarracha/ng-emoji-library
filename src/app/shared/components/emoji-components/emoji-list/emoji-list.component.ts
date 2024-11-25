import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
export class EmojiListComponent implements OnInit, OnDestroy {
  @ViewChild('emojiListContainer') emojiListContainer!: ElementRef;

  groupedEmojis: { [category: string]: any[] } = {};
  filteredEmojis: { [category: string]: any[] } | null = null;
  activeCategory: string | null = null;
  isLoadingEmojis: boolean = true;

  loadingEmojiList: string[] = ['😀', '😂', '😍', '😎', '🤩', '🥳', '😅', '🙃', '🤔', '🤯'];
  currentLoadingEmoji: string = '';
  loadingEmojiInterval: any;

  constructor(private emojiApiService: EmojiApiService) {}

  ngOnInit(): void {
    this.startLoadingEmojiAnimation();

    this.emojiApiService.getAllEmojiGroupedByCategory().subscribe({
      next: groupedEmojis => {
        this.groupedEmojis = groupedEmojis;
        this.isLoadingEmojis = false;
        this.stopLoadingEmojiAnimation();
      },
      error: err => {
        console.error('Failed to load emojis:', err);
        this.isLoadingEmojis = false;
        this.stopLoadingEmojiAnimation();
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

  ngOnDestroy(): void {
    this.stopLoadingEmojiAnimation();
  }

  private startLoadingEmojiAnimation(): void {
    const remainingEmojis = [...this.loadingEmojiList];
    this.loadingEmojiInterval = setInterval(() => {
      if (remainingEmojis.length === 0) {
        // Reset to allow re-shuffling
        remainingEmojis.push(...this.loadingEmojiList);
      }
      const randomIndex = Math.floor(Math.random() * remainingEmojis.length);
      this.currentLoadingEmoji = remainingEmojis.splice(randomIndex, 1)[0];
    }, 100); // Change emoji every 100ms
  }

  private stopLoadingEmojiAnimation(): void {
    if (this.loadingEmojiInterval) {
      clearInterval(this.loadingEmojiInterval);
    }
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
