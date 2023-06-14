import { User } from '@entities'

export interface AuthInfo {
  login: string
  id: number
  roles: User.Role[]
  companyId?: number
}
