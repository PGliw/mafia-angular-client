import { TestBed } from '@angular/core/testing';

import { DebetorsService } from './debetors.service';

describe('MafiaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebetorsService = TestBed.get(DebetorsService);
    expect(service).toBeTruthy();
  });
});
