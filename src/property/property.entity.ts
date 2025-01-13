import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PropertyFeature } from './propertyFeature.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(
    () => PropertyFeature,
    (propertyFeaqture) => propertyFeaqture.property,
    {cascade: true}
  )
  propertyFeature: PropertyFeature;

  @ManyToOne(
    () => User,
    (user) => user.properties,
  )
  user: User;

  @ManyToMany(()=> User, (user) => user.likedProperties)
  likedBy: User[]
}
