import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskState } from '../enum';
import { Type } from 'class-transformer';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text')
  assignee_id: string;

  @Column('text')
  project_id: string;

  @Column('boolean', { default: true })
  is_active: boolean;

  @Column('date')
  due_date: Date;

  @Column('enum', { enum: TaskState, default: TaskState.TODO })
  status: TaskState;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
