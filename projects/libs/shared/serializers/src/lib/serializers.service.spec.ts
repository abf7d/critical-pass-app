import { TestBed } from '@angular/core/testing';

import { SerializersService } from './serializers.service';

describe('SerializersService', () => {
  let service: SerializersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerializersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
