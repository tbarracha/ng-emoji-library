import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { EmojiListComponent } from "./shared/components/emoji-components/emoji-list/emoji-list.component";
import { EmojiApiService } from './core/services/emoji-api/emoji-api.service';
import { EventService } from './core/services/events/event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, EmojiListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Emoji Lib';
  allEmojis: any[] = [];
  isSidebarOpen = false;

  constructor(private emojiApiService: EmojiApiService) {}

  ngOnInit(): void {
    // Fetch all emojis
    this.emojiApiService.getAllEmoji().subscribe({
      next: emojis => (this.allEmojis = emojis),
      error: err => console.error('Failed to load emojis:', err)
    });

    EventService.onSidebarToggled.subscribe(isOpen => (this.isSidebarOpen = isOpen));
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
