import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MySqlConfigService {
  constructor(private configService: ConfigService) {}

  getHost(): string {
    return this.configService.get('mysql.host');
  }

  getPort(): number {
    return +this.configService.get('mysql.port');
  }

  getUsername(): string {
    return this.configService.get('mysql.username');
  }

  getPassword(): string {
    return this.configService.get('mysql.password');
  }

  getDatabase(): string {
    return this.configService.get('mysql.database');
  }
}
