import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getOne(id: number) {
    const namaBazaUser = await this.prisma.user.findUnique({
      where: { id: +id },
    });

    if (!namaBazaUser) {
      return { message: 'User not found database !' };
    }

    return namaBazaUser;
  }

  async createUser(data: any) {
    const namaBazaUser = await this.prisma.user.findFirst({
      where: { name: data.name },
    });
    if (namaBazaUser) {
      return { message: 'User already exists' };
    }
    return this.prisma.user.create({ data: data });
  }

  async updateUser(id: number, data: any) {
    const namaBazaUser = await this.prisma.user.findUnique({
      where: { id: +id },
    });

    console.log(namaBazaUser);

    if (!namaBazaUser) {
      return { message: 'User not found database !' };
    }

    const BazaUser = await this.prisma.user.findFirst({
      where: { name: data.name },
    });
    if (BazaUser) {
      return { message: 'User already exists' };
    }

    await this.prisma.user.update({
      where: { id: +id },
      data: {
        ...data,
      },
    });

    return { message: 'user successfully updated' };
  }

  async delUser(id: number) {
    const namaBazaUser = await this.prisma.user.findUnique({
      where: { id: +id },
    });

    if (!namaBazaUser) {
      return { message: 'User not found database !' };
    }

    let userDel = await this.prisma.user.delete({ where: { id: +id } });
    return { message: 'User deleted successfully\n', userDel };
  }
}
