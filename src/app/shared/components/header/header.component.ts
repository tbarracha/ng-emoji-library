import { Component } from '@angular/core';
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { EmojiSelectionComponent } from "../emoji-components/emoji-selection/emoji-selection.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchbarComponent, EmojiSelectionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
