import { TestBed } from '@angular/core/testing';

import { DesktopLibService } from './desktop-lib.service';

describe('DesktopLibService', () => {
  let service: DesktopLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesktopLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
