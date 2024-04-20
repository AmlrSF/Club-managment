import { TestBed } from '@angular/core/testing';

import { FuncServicesService } from './func-services.service';

describe('FuncServicesService', () => {
  let service: FuncServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
