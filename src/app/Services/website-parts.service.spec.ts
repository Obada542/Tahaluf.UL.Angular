import { TestBed } from '@angular/core/testing';

import { WebsitePartsService } from './website-parts.service';

describe('WebsitePartsService', () => {
  let service: WebsitePartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsitePartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
