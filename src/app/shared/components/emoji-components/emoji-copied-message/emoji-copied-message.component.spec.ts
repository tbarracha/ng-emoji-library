import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiCopiedMessageComponent } from './emoji-copied-message.component';

describe('EmojiCopiedMessageComponent', () => {
  let component: EmojiCopiedMessageComponent;
  let fixture: ComponentFixture<EmojiCopiedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiCopiedMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiCopiedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
