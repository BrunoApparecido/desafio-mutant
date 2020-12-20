import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import UserEntity, { IUserEntity } from './UserEntity'

export interface IContactEntity {
  id?: Number
  email: String
  phone: String
  website: String
  user?: IUserEntity
}

@Entity()
export class ContactEntity implements IContactEntity {
  @PrimaryGeneratedColumn()
  id?: Number = 0

  @Column('varchar')
  email: String = ''

  @Column('varchar')
  phone: String = ''

  @Column('varchar')
  website: String = ''

  @OneToOne(() => UserEntity, (user: IUserEntity) => user.contact) // specify inverse side as a second parameter
  user?: UserEntity;
}

export default ContactEntity
