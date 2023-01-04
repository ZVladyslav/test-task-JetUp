import { Injectable } from '@nestjs/common'
import { UserEntity } from './entities'
import { IUsersData, IUserSortParameters, IUsersService } from './interfaces'
import { UsersRopository } from './users.repository'
import puppeteer from 'puppeteer'
import { load } from 'cheerio'
import { SELECTOR, URL } from './constants'

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly userRepository: UsersRopository) {}

  async parseAndSaveUsers(): Promise<void> {
    const users = await this.parceUsers()
    users.forEach((user) => this.create(user))
  }

  async parceUsers(): Promise<IUsersData[]> {
    const browser = await puppeteer.launch()
    try {
      const page = await browser.newPage()
      await page.goto(URL)
      const users = await page.content()
      const $ = load(users)
      const members = []

      $(SELECTOR).each((i, element) => {
        const name = $(element).find('h2').text()
        const position = $(element).find('h3').text()
        const text = $(element).find('p').text().replaceAll('\n', '')

        members.push({
          name,
          position,
          text,
        })
      })
      return members
    } catch (error) {
      console.log(error.message)
    } finally {
      await browser.close()
    }
  }

  async create(user: IUsersData): Promise<UserEntity> {
    return await this.userRepository.create(user)
  }

  async getAll(parameters: IUserSortParameters): Promise<UserEntity[]> {
    const { filter, sortBy = 'id', direction = 'ASC', limit, skip } = parameters
    const users = await this.userRepository.findAndSort({
      filter,
      sortBy,
      direction,
      limit,
      skip,
    })
    return users
  }
}
