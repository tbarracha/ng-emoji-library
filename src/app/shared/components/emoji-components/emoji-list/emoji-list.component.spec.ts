import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiListComponent } from './emoji-list.component';

describe('EmojiListComponent', () => {
  let component: EmojiListComponent;
  let fixture: ComponentFixture<EmojiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
