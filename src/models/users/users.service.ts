import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async checkEmailExist(email: string) {
    return await this.userEntity.findOne({
      where: {
        email,
      },
    });
  }

  async create(dto: RegisterDto) {
    // mã hoá mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(dto.password, salt);
    // thêm user vào database
    const user = this.userEntity.create({
      ...dto,
      password: passwordHash,
    });
    await this.userEntity.save(user);
    return 'Tạo người dùng thành công';
  }

  async findOne(email: string) {
    return await this.userEntity.findOne({
      where: {
        email,
      },
    });
  }
}
