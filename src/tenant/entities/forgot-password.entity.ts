import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'tenant_forgot_password_requests',
})
export class ForgotPasswordRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  tenant_id: string;

  @CreateDateColumn()
  created_at: Date;
}
