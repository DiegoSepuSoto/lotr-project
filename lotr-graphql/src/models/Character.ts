import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

import {Field, Int, ObjectType} from 'type-graphql';

@ObjectType()
@Entity()
export class Characters extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  image!: string;

  @Field(() => String)
  @Column()
  link!: string;

  @Field(() => String)
  @Column()
  category!: string;

  @Field(() => Int)
  @Column('int')
  up_votes!: number;

  @Field()
  @CreateDateColumn({type: 'timestamp with time zone'})
  created_at!: string;

  @Field()
  @UpdateDateColumn({type: 'timestamp with time zone'})
  updated_at!: string;

  @Field()
  @DeleteDateColumn({type: 'timestamp with time zone'})
  deleted_at!: string;
}
