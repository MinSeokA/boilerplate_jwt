import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'User email address' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User password' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Account creation date and time' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Account update date and time' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'User roles' })
  @Column('simple-array', { default: 'user' }) // roles를 배열 형태로 저장
  roles: string[];
}