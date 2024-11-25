import { Component, OnInit } from '@angular/core';
import { EmojiApiService } from '../../../core/services/emoji-api/emoji-api.service';
import { EventService } from '../../../core/services/events/event.service';
import { CategoryTransformPipe } from '../../../core/pipes/category-transform.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, CategoryTransformPipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string | null = null;
  firstEmojis: { [category: string]: string } = {};
  isOpen: boolean = false;

  constructor(private emojiApiService: EmojiApiService) {}

  ngOnInit(): void {
    this.emojiApiService.getAllEmojiGroupedByCategory().subscribe({
      next: groupedEmojis => {
        this.categories = ['All', ...Object.keys(groupedEmojis)];
        this.firstEmojis = { All: '🌍' };

        for (const category of Object.keys(groupedEmojis)) {
          const firstEmoji = groupedEmojis[category]?.[0]?.character || '';
          this.firstEmojis[category] = firstEmoji;
        }
        this.selectCategory('All');
      },
      error: err => console.error('Failed to load categories:', err)
    });

    EventService.onSidebarToggled.subscribe(isOpen => (this.isOpen = isOpen));
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    EventService.onCategoryClicked.emit(category === 'All' ? undefined : category);
  }

  getFirstEmoji(category: string): string {
    return this.firstEmojis[category] || '';
  }

  closeSidebar(): void {
    EventService.onSidebarToggled.emit(false);
  }
}
