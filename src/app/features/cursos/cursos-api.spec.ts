import { TestBed } from '@angular/core/testing';

import { CursosApi } from './cursos-api';

describe('CursosApi', () => {
  let service: CursosApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
