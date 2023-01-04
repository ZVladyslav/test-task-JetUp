import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common'
import { IUsersData } from './interfaces'
import { UsersService } from './users.service'

@Controller('/api/users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(
    @Query() { filterBy, filterText, sortBy, direction, limit, skip }
  ): Promise<IUsersData[]> {
    let filter = {}
    if (filterBy !== undefined && filterText !== undefined) {
      filter[filterBy] = filterText
    }
    const users = await this.userService.getAll({
      filter,
      sortBy,
      direction,
      limit: Number(limit),
      skip: Number(skip),
    })
    return users
  }
}
