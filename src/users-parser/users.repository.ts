import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { DEFAULT_LIMIT, DEFAULT_SKIP } from './constants'
import { UserEntity } from './entities'
import { IUsersData, IUserSortParameters } from './interfaces'

@Injectable()
export class UsersRopository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async create(user: IUsersData): Promise<UserEntity> {
    const newUser = this.usersRepository.create(user)
    return await this.usersRepository.save(newUser)
  }

  async findAndSort(parameters: IUserSortParameters): Promise<UserEntity[]> {
    let params: FindManyOptions<UserEntity> = {}

    params.where = Object.entries(parameters.filter).reduce(
      (acc, [key, value], index) => {
        if (index >= 0) {
          acc[key] = value
        }
        return acc
      },
      {}
    )

    params.order = {
      [parameters.sortBy]: parameters.direction,
    }
    params.take = parameters.limit || DEFAULT_LIMIT
    params.skip = parameters.skip || DEFAULT_SKIP

    return await this.usersRepository.find(params)
  }
}
