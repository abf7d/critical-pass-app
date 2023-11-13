import { TestBed } from '@angular/core/testing';

import { WebLibService } from './web-lib.service';

describe('WebLibService', () => {
  let service: WebLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
