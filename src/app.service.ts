import { Injectable } from '@nestjs/common'
import { UsersService } from './users-parser/users.service'

@Injectable()
export class AppService {
  constructor(private readonly userService: UsersService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.userService.parseAndSaveUsers()
  }
}
