import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @Get()
  getAllUser() {
    return this.userServise.getAll();
  }

  @Post()
  createUser(@Body() data: any) {
    return this.userServise.createUser(data);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() data: any) {
    return this.userServise.updateUser(id, data);
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.userServise.getOne(id);
  }

  @Delete("/:id")
  delUser(@Param('id') id:number){
    return this.userServise.delUser(id)
  }
}
