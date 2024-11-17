import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiSelectionComponent } from './emoji-selection.component';

describe('EmojiSelectionComponent', () => {
  let component: EmojiSelectionComponent;
  let fixture: ComponentFixture<EmojiSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
