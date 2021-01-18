import { TestBed } from '@angular/core/testing';

import { FatoresResolverGuard } from './fatores-resolver.guard';

describe('FatoresResolverGuard', () => {
  let guard: FatoresResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FatoresResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
