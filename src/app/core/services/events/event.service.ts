import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public static readonly onCategoryClicked: EventEmitter<string> = new EventEmitter<string>();
  public static readonly onSubcategoryClicked: EventEmitter<{ category: string, subcategory: string }> = new EventEmitter<{ category: string, subcategory: string }>();

  public static readonly onEmojiClicked: EventEmitter<any> = new EventEmitter<any>();

  public static readonly onSearchInput: EventEmitter<string> = new EventEmitter<string>();
  public static readonly onCopiedToClipboard: EventEmitter<void> = new EventEmitter<void>();
  public static readonly onSidebarToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
}
