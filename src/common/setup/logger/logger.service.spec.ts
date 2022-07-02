import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { LoggerModule } from './logger.module';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.log).toBeDefined();
    expect(service.error).toBeDefined();
    expect(service.warn).toBeDefined();
    expect(service.debug).toBeDefined();
    expect(service.info).toBeDefined();
    expect(service.verbose).toBeDefined();
    expect(service.fatal).toBeDefined();
  });

  it('should be called with given text', function () {
    const spyLog = jest.spyOn(console, 'log').mockImplementation(void 0);
    service.log('test-message', 'test');
    expect(spyLog).toHaveBeenCalledWith(expect.stringMatching(/test-message/));
    spyLog.mockRestore();

    const spyError = jest.spyOn(console, 'error').mockImplementation(void 0);
    service.error('test-message', 'test');
    expect(spyError).toHaveBeenCalledWith(
      expect.stringMatching(/test-message/),
    );
    spyError.mockRestore();

    const spyWarn = jest.spyOn(console, 'warn').mockImplementation(void 0);
    service.warn('test-message', 'test');
    expect(spyWarn).toHaveBeenCalledWith(expect.stringMatching(/test-message/));
    spyWarn.mockRestore();

    const spyDebug = jest.spyOn(console, 'debug').mockImplementation(void 0);
    service.debug('test-message', 'test');
    expect(spyDebug).toHaveBeenCalledWith(
      expect.stringMatching(/test-message/),
    );
    spyDebug.mockRestore();

    const spyInfo = jest.spyOn(console, 'info').mockImplementation(void 0);
    service.info('test-message', 'test');
    expect(spyInfo).toHaveBeenCalledWith(expect.stringMatching(/test-message/));
    spyInfo.mockRestore();

    const spyVerbose = jest.spyOn(console, 'log').mockImplementation(void 0);
    service.verbose('test-message', 'test');
    expect(spyVerbose).toHaveBeenCalledWith(
      expect.stringMatching(/test-message/),
    );
    spyVerbose.mockRestore();

    const spyFatal = jest.spyOn(console, 'error').mockImplementation(void 0);
    service.fatal('test-message', 'test');
    expect(spyFatal).toHaveBeenCalledWith(
      expect.stringMatching(/test-message/),
    );
    spyFatal.mockRestore();
  });
});
