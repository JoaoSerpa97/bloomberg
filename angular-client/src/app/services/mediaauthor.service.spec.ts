import { TestBed } from '@angular/core/testing';

import { MediaAuthorService } from './media-author.service';

describe('MediaAuthorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaAuthorService = TestBed.get(MediaAuthorService);
    expect(service).toBeTruthy();
  });
});
