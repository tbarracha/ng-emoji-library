import { Component } from '@angular/core';
import { EventService } from '../../../core/services/events/event.service';
import { SidebarToggleComponent } from "../sidebar-toggle/sidebar-toggle.component";

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [SidebarToggleComponent],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  isFocused: boolean = false;

  onSearch(query: string): void {
    console.log('Search query:', query);
    EventService.onSearchInput.emit(query);
  }

  onClear(searchInput: HTMLInputElement): void {
    searchInput.value = '';
    this.onSearch('');
  }

  onRandom(): void {
    EventService.onCopiedToClipboard.emit();
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
