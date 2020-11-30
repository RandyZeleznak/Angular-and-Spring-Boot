import { TestBed } from '@angular/core/testing';

import { ZsquaredShopFormService } from './zsquared-shop-form.service';

describe('ZsquaredShopFormService', () => {
  let service: ZsquaredShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZsquaredShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
