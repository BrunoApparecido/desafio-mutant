import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import UserEntity, { IUserEntity } from './UserEntity'

export interface IAddressEntitiy {
  id?: Number
  street: String,
  suite: String,
  city: String,
  zipcode: String,
  lat: String,
  lng: String
}

@Entity()
export class AddressEntity implements IAddressEntitiy {
  @PrimaryGeneratedColumn()
  id?: Number = 0

  @Column('varchar')
  street: String = ''

  @Column('varchar')
  suite: String = ''

  @Column('varchar')
  city: String = ''

  @Column('varchar')
  zipcode: String = ''

  @Column('varchar')
  lat: String = ''

  @Column('varchar')
  lng: String = ''

  @OneToOne(() => UserEntity, (user: IUserEntity) => user.address) // specify inverse side as a second parameter
  user?: UserEntity;
}

export default AddressEntity
