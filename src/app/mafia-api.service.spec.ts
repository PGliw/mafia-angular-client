import { TestBed } from '@angular/core/testing';

import { MafiaApiService } from './mafia-api.service';

describe('MafiaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MafiaApiService = TestBed.get(MafiaApiService);
    expect(service).toBeTruthy();
  });
});
