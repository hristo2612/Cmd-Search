import { TestBed } from '@angular/core/testing';

import { CommandRunnerService } from './command-runner.service';

describe('CommandRunnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandRunnerService = TestBed.get(CommandRunnerService);
    expect(service).toBeTruthy();
  });
});
