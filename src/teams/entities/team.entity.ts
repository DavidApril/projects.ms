import { Project } from 'src/projects/entities';
import { Task } from 'src/tasks/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamMembership } from './team-membership';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(() => TeamMembership, (teamMembership) => teamMembership.team)
  // memberships: TeamMembership[];

  @OneToMany(() => Project, (project) => project.team, { eager: true })
  projects: Project[];

  @OneToMany(() => Task, (task) => task.team_id, {
    // eager: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
