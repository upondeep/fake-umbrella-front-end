import { TestBed } from '@angular/core/testing';

import { WeatherCacheService } from './weather-cache.service';

describe('WeatherCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherCacheService = TestBed.get(WeatherCacheService);
    expect(service).toBeTruthy();
  });
});
