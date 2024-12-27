import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskState } from '../enum';
import { Project } from 'src/projects/entities';
import { Team } from 'src/teams/entities';

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

  @Column('text', { nullable: true })
  team_id: string | null = null;

  @Column('boolean', { default: true })
  is_active: boolean;

  @Column('text')
  due_date: string;

  @Column('enum', { enum: TaskState, default: TaskState.TODO })
  status: TaskState;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
