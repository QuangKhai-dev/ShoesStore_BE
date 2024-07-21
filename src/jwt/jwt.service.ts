import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceCustom {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: any, options?: any) {
    return this.jwtService.sign(payload, options);
  }

  verify(token: string, options?: any) {
    return this.jwtService.verify(token, options);
  }

  decode(token: string) {
    return this.jwtService.decode(token);
  }
}
