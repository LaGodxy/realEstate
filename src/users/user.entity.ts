import { Entity, Column, CreateDateColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Property } from 'src/property/property.entity';
import * as bcrypt from 'bcrypt';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable: true})
  avatarUrl: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  password: string;

  @Column({nullable: true})
  hashedRefreshToken: string;

  @OneToMany(() => Property, (property) => property.user, { cascade: true })
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedBy)
  @JoinTable()
  likedProperties: Property[];

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10)
  }
}
