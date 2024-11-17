import { Component, HostListener, OnInit } from '@angular/core';
import { EventService } from '../../../core/services/events/event.service';

@Component({
  selector: 'app-sidebar-toggle',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss']
})
export class SidebarToggleComponent implements OnInit {
  isSidebarOpen: boolean = window.innerWidth >= 768;

  constructor() {}

  ngOnInit(): void {
    this.adjustSidebarState();
    EventService.onSidebarToggled.subscribe(isOpen => (this.isSidebarOpen = isOpen));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustSidebarState();
  }

  private adjustSidebarState(): void {
    const isPc = window.innerWidth >= 768;
    this.isSidebarOpen = isPc;
    EventService.onSidebarToggled.emit(this.isSidebarOpen);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    EventService.onSidebarToggled.emit(this.isSidebarOpen);
  }
}
