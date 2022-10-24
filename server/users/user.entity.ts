import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("varchar", { nullable: true })
  phone: string;

  @Column("text")
  passwordHash: string;

  @Column("text", { nullable: true })
  avatarUrl: string;

  @Column("boolean", { default: true })
  confirmed: boolean;

  @Column("boolean", { default: false })
  forgotPasswordLocked: boolean;
}
