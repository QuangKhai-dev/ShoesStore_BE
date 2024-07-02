import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASS,
  username: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
}));
