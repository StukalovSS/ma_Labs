import { TestBed, inject } from '@angular/core/testing';

import { KemenySnellService } from './kemeny-snell.service';

describe('KemenySnellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KemenySnellService]
    });
  });

  it('should be created', inject([KemenySnellService], (service: KemenySnellService) => {
    expect(service).toBeTruthy();
  }));
});
