import { TestBed } from '@angular/core/testing';

import { DebtorsService } from './debtors.service';

describe('MafiaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebtorsService = TestBed.get(DebtorsService);
    expect(service).toBeTruthy();
  });
});
