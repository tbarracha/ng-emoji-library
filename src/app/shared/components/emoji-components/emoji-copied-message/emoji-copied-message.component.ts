import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EventService } from '../../../../core/services/events/event.service';

@Component({
  selector: 'app-emoji-copied-message',
  standalone: true,
  imports: [],
  templateUrl: './emoji-copied-message.component.html',
  styleUrls: ['./emoji-copied-message.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(10px)' // Start slightly below
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateY(0)' // Move to its normal position
        })
      ),
      transition('void => *', [
        animate('0.2s ease-in') // Fade in and move up
      ]),
      transition('* => void', [
        animate('0.3s ease-out') // Fade out and move down
      ])
    ])
  ]
})
export class EmojiCopiedMessageComponent implements OnInit {
  @Input() message: string = 'Copied to clipboard!';
  visible: boolean = false;
  private timeoutId: any = null;

  ngOnInit(): void {
    EventService.onCopiedToClipboard.subscribe(() => this.show());
  }

  show(duration: number = 2000): void {
    // If already visible, reset visibility to restart animation
    if (this.visible) {
      this.resetVisibility(() => this.visible = true);
    } else {
      this.visible = true;
    }

    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Set a timeout to hide the message
    this.timeoutId = setTimeout(() => {
      this.visible = false;
      this.timeoutId = null;
    }, duration);
  }

  close(): void {
    clearTimeout(this.timeoutId);
    this.resetVisibility();
  }

  private resetVisibility(callback?: () => void): void {
    // Temporarily set visibility to false to restart animation
    this.visible = false;

    // Allow Angular's change detection to update the DOM
    setTimeout(() => {
      if (callback) {
        callback();
      }
    }, 0);
  }
}
