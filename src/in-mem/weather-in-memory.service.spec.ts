import { TestBed } from '@angular/core/testing';

import { WeatherInMemoryService } from './weather-in-memory.service';

describe('WeatherInMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherInMemoryService = TestBed.get(WeatherInMemoryService);
    expect(service).toBeTruthy();
  });
});
