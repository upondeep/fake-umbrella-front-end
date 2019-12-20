import { InMemoryDbService } from 'angular-in-memory-web-api';

export class WeatherInMemoryService implements InMemoryDbService {
  createDb() {
    let weathers = [];
    return { weathers };
  }

  constructor() { }
}
