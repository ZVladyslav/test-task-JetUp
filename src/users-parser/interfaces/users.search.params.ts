export interface IUserSortParameters {
  filter?: {
    name?: string
    position?: string
  }
  sortBy?: 'name' | 'id'
  direction?: 'ASC' | 'DESC'
  limit?: number
  skip?: number
}
