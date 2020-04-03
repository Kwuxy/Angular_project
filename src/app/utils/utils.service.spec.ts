import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let utilsService: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(utilsService).toBeTruthy();
  });


  test('should return 0 when generatingRandomInt with random < 0.5 and max = 2', () => {
    utilsService.random = () => 0.49;
    expect(utilsService.getRandomInt(2)).toBe(0);
  });

  test('should return 1 when generatingRandomInt with random > 0.5 and max = 2', () => {
    utilsService.random = () => 0.51;
    expect(utilsService.getRandomInt(2)).toBe(1);
  });
});
