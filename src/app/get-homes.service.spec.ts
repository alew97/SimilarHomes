import { TestBed, inject } from '@angular/core/testing';

import { GetHomesService } from './get-homes.service';

describe('GetHomesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetHomesService]
    });
  });

  it('should be created', inject([GetHomesService], (service: GetHomesService) => {
    expect(service).toBeTruthy();
  }));
});
