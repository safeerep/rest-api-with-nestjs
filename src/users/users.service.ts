import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = []
  private currentId: number = 1;
  create(createUserDto: CreateUserDto) {
    createUserDto.id = this.currentId;
    this.currentId++;
    this.users.push(createUserDto)
    return {
      users: this.users,
      message: "successfully added a new user"
    }
  }

  findAll() {
    if (this.users.length) 
    return {
      users: this.users,
      message: "successfully fetched all the users"
    } 

    return {
      message: "sorry, add users first and then try to retrieve safeer"
    }
  }

  findOne(id: number) {
    const user = this.users.filter((user) => {
      return user.id === id;
    })

    if(user.length)
    return {
      user: user[0],
      message: "successfully fetched single user' data"
    }

    return {
      message: "hey safeee its invalid id"
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const indexToUpdate = this.users.findIndex((obj) => obj.id === id)
    this.users[indexToUpdate] = { id, ...updateUserDto}
    return {
      updatedUser: this.users[indexToUpdate],
      message: `successfully updated userdata with id ${id}`
    }
  }

  remove(id: number) {
    const indexToDelete: number = this.users.findIndex((user: UserDto) => {
      return user.id === id;
    })
    const userToDelete: UserDto = this.users[indexToDelete];
    this.users.splice( indexToDelete, 1)
    return {
      deletedUser: userToDelete,
      message: `successfully deleted a user with id ${id}`
    }
  }
}
