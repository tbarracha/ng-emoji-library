import { TestBed } from '@angular/core/testing';

import { EmojiApiService } from './emoji-api.service';

describe('EmojiApiService', () => {
  let service: EmojiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
