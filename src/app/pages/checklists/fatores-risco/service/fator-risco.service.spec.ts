import { TestBed } from '@angular/core/testing';

import { FatorRiscoService } from './fator-risco.service';

describe('FatorRiscoService', () => {
  let service: FatorRiscoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FatorRiscoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
