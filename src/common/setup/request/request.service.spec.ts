import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestModule } from './request.module';

describe('RequestService', () => {
  let requestService: RequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RequestModule],
    }).compile();

    requestService = await module.resolve<RequestService>(RequestService);
  });

  it('should be defined', () => {
    expect(requestService).toBeDefined();
  });

  describe('hasRequestId', () => {
    it('should return false', () => {
      const request = {
        get: () => jest.fn(),
        headers: {},
      } as unknown as Request;
      expect(RequestService.hasRequestId(request)).toBeFalsy();
    });

    it('should return false when reqId present but not UUID type', () => {
      const request = {
        get: () => request.headers['x-request-id'],
        headers: {
          'x-request-id': '123',
        },
      } as unknown as Request;
      expect(RequestService.hasRequestId(request)).toBeFalsy();
    });

    it('should return true when reqId present and UUID type', () => {
      const request = {
        get: () => request.headers['x-request-id'],
        headers: {
          'x-request-id': uuidv4(),
        },
      } as unknown as Request;
      expect(RequestService.hasRequestId(request)).toBeTruthy();
    });
  });

  describe('injectRequestId', () => {
    it('should inject request id', () => {
      const request = {
        headers: {},
      } as unknown as Request;
      RequestService.injectRequestId(request);
      expect(request.headers).toEqual({
        'x-request-id': expect.any(String),
      });
    });
  });

  describe('getRequestId', () => {
    it('should return request id', () => {
      const request = {
        get: () => request.headers['x-request-id'],
        headers: {
          'x-request-id': uuidv4(),
        },
      } as unknown as Request;
      const requestService = new RequestService(request);
      expect(requestService.getRequestId()).toEqual(
        request.headers['x-request-id'],
      );
    });
  });
});
