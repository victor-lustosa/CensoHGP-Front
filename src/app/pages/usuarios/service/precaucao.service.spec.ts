import { TestBed } from '@angular/core/testing';

import { PrecaucaoService } from './precaucao.service';

describe('PrecaucaoService', () => {
  let service: PrecaucaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecaucaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
