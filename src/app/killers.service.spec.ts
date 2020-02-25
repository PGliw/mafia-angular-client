import { TestBed } from '@angular/core/testing';

import { KillersService } from './killers.service';

describe('KillersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KillersService = TestBed.get(KillersService);
    expect(service).toBeTruthy();
  });
});
