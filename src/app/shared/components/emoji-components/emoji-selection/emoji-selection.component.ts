import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventService } from '../../../../core/services/events/event.service';

@Component({
  selector: 'app-emoji-selection',
  standalone: true,
  imports: [],
  templateUrl: './emoji-selection.component.html',
  styleUrls: ['./emoji-selection.component.scss'],
})
export class EmojiSelectionComponent implements OnInit {
  @ViewChild('emojiStringInput') emojiStringInput!: ElementRef<HTMLTextAreaElement>;
  emojiString: string = '';

  constructor() {}

  ngOnInit(): void {
    EventService.onEmojiClicked.subscribe((emoji: any) => {
      console.log('Emoji clicked:', emoji);
      this.addEmojiAtCursor(emoji.character);
    });
  }

  addEmojiAtCursor(emoji: string): void {
    const input = this.emojiStringInput.nativeElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    // Update the string by inserting the emoji at the cursor position
    this.emojiString =
      this.emojiString.slice(0, start) + emoji + this.emojiString.slice(end);

    // Update the input value manually
    input.value = this.emojiString;

    // Move the cursor position after the inserted emoji
    input.selectionStart = input.selectionEnd = start + emoji.length;

    // Trigger change detection if necessary
    input.focus();
  }

  updateEmojiString(value: string): void {
    this.emojiString = value;
  }

  clearEmojis(): void {
    this.emojiString = '';
  }

  copyEmojis(): void {
    navigator.clipboard.writeText(this.emojiString).then(
      () => EventService.onCopiedToClipboard.emit(),
      (err) => console.error('Failed to copy emojis:', err)
    );
  }
}
