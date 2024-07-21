import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtServiceCustom } from 'src/jwt/jwt.service';
import { LoginDto, RegisterDto } from 'src/models/users/dto/user.dto';
import { UsersService } from 'src/models/users/users.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtServiceCustom: JwtServiceCustom,
  ) {}
  async registerUser(dto: RegisterDto) {
    // check email tồn tại
    const checkExist = await this.userService.checkEmailExist(dto.email);
    if (checkExist) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const newUser = await this.userService.create(dto);
    // tạo token refresh và token access
    const payload = {
      username: checkExist.email,
      sub: checkExist.id,
    };
    return {
      access_token: this.jwtServiceCustom.sign(payload),
      refresh_token: this.jwtServiceCustom.sign(payload, { expiresIn: '7d' }), // Refresh Token expires in 7 days
      user: newUser,
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    // kiểm tra người dùng trong hệ thống
    const checkExist = await this.userService.findOne(user.email);
    if (!checkExist) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    // kiểm tra mật khẩu
    if (!(await bcrypt.compare(user.password, checkExist.password))) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    const payload = {
      username: checkExist.email,
      sub: checkExist.id,
    };
    delete checkExist.password;
    return {
      access_token: this.jwtServiceCustom.sign(payload),
      refresh_token: this.jwtServiceCustom.sign(payload, { expiresIn: '7d' }), // Refresh Token expires in 7 days
      user: checkExist,
    };
  }

  async refresh(token: string) {
    try {
      const payload = this.jwtServiceCustom.verify(token, {
        ignoreExpiration: true,
      });
      return {
        access_token: this.jwtServiceCustom.sign({
          username: payload.username,
          sub: payload.sub,
        }),
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
