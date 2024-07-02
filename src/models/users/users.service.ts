import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async create(dto: RegisterDto) {
    // thực hiện kiểm tra email đã tồn tại chưa
    const isExist = await this.userEntity.findOne({
      where: {
        email: dto.email,
      },
    });
    if (isExist) {
      throw new BadRequestException('Email đã tồn tại');
    }
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
