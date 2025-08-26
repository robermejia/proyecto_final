import { TestBed } from '@angular/core/testing';

import { AlumnosAPI } from './alumnos-api';

describe('AlumnosAPI', () => {
  let service: AlumnosAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
