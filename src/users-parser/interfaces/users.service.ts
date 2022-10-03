import { UserEntity } from '../entities/user.entity'
import { IUsersData } from './user'
import { IUserSortParameters } from './users.search.params'

export interface IUsersService {
  create(user: IUsersData): Promise<UserEntity>
  getAll(parameters: IUserSortParameters): Promise<UserEntity[]>
  parseAndSaveUsers(): Promise<void>
  parceUsers(): Promise<IUsersData[]>
}
