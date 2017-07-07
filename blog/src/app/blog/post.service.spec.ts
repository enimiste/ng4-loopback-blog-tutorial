import { TestBed, inject } from '@angular/core/testing';

import { RestPostService } from './post.service';

describe('RestPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestPostService]
    });
  });

  it('should be created', inject([RestPostService], (service: RestPostService) => {
    expect(service).toBeTruthy();
  }));
});
