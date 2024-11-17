import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkintonePickerComponent } from './skintone-picker.component';

describe('SkintonePickerComponent', () => {
  let component: SkintonePickerComponent;
  let fixture: ComponentFixture<SkintonePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkintonePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkintonePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
