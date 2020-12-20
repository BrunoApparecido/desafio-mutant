import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import AddressEntity from './AddressEntity'
import ContactEntity from './ContactEntity'

export interface IUserEntity {
  id?: number
  apiId: Number
  name: String
  username: String
  address: AddressEntity
  contact: ContactEntity
}

@Entity()
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn()
  id?: number = 0

  @Column({
    unique: true,
    type: 'int'
  })
  apiId: Number = 0

  @Column('varchar')
  name: String = ''

  @Column('varchar')
  username: String = ''

  @OneToOne(() => AddressEntity, {
    cascade: true
  })
  @JoinColumn()
  address!: AddressEntity

  @OneToOne(() => ContactEntity, {
    cascade: true
  })
  @JoinColumn()
  contact!: ContactEntity
}

export default UserEntity
