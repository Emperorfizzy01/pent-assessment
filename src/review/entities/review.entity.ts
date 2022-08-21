import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  comment: string;

  @Column({ nullable: false, type: 'text' })
  email: string;

  @Column({ nullable: true, type: 'text' })
  attachments: any;

  @Column()
  date: Date;

  @Column({ nullable: true, type: 'text', default: '0' })
  count: string;
}