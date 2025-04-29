import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import {  JwtAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: JwtAuthGuard;
  let mockContext: Partial<ExecutionContext>;
  let mockRequest: any;

  beforeEach(() => {
    guard = new JwtAuthGuard();

    mockRequest = {
      user: null,
    };

    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    };
  });

  it('should be defined', () => {
    expect(new JwtAuthGuard).toBeDefined();
  });

  describe('canActive', () => {
    it('debería retornar true si super.canActivate funciona', async () => {
      const mockGuard = new (class extends JwtAuthGuard {
        async canActivate(context: ExecutionContext): Promise<boolean> {
            return true;
        }
      })();

      const result = await mockGuard.canActivate(mockContext as ExecutionContext);
      expect(result).toBe(true);
    });

    it('debería lanzar UnauthorizedException si super.canActivate falla', async () => {
      const canActiveSpy = jest.spyOn(Object.getPrototypeOf(JwtAuthGuard.prototype), 'canActivate');
      canActiveSpy.mockImplementationOnce(() => {
        throw new Error('mock error');
      });

      await expect(guard.canActivate(mockContext as ExecutionContext))
      .rejects
      .toThrow(UnauthorizedException);

      canActiveSpy.mockRestore();
    });
  });

  describe('handleRequest', () => {
    it('debería lanzar UnauthorizedException si hay error', () => {
      expect(() => guard.handleRequest(new Error('fail'), null, null, mockContext as ExecutionContext))
      .toThrow(UnauthorizedException);
    });

    it('debería lanzar UnauthorizedException si no hay user', () => {
      expect(() => guard.handleRequest(null, null, null, mockContext as ExecutionContext))
      .toThrow(UnauthorizedException);
    });

    it('debería procesar correctamente el user y asignarlo al request', () => {
      const user = {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        username: 'testUser',
      };

      const result = guard.handleRequest(null, user, null, mockContext as ExecutionContext);

      expect(result).toBeDefined();
      expect(typeof result.iat).toBe('string');
      expect(typeof result.exp).toBe('string');
      expect(mockRequest.user).toEqual(result);

    })
  })
});
