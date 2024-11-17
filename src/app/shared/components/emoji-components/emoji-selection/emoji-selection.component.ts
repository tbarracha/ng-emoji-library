import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/events/event.service';

@Component({
  selector: 'app-emoji-selection',
  standalone: true,
  imports: [],
  templateUrl: './emoji-selection.component.html',
  styleUrls: ['./emoji-selection.component.scss']
})
export class EmojiSelectionComponent implements OnInit {
  emojiString: string = '';

  constructor() {}

  ngOnInit(): void {
    EventService.onEmojiClicked.subscribe((emoji: any) => {
      console.log('Emoji clicked:', emoji);
      this.addEmoji(emoji.character);
    });
  }

  addEmoji(emoji: string): void {
    this.emojiString += emoji;
  }

  clearEmojis(): void {
    this.emojiString = '';
  }

  copyEmojis(): void {
    navigator.clipboard.writeText(this.emojiString).then(
      () => EventService.onCopiedToClipboard.emit(),
      err => console.error('Failed to copy emojis:', err)
    );
  }
}
