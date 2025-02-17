import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { InstitutionEntity } from './institution.entity';
import { CreditDocumentEntity } from './credit-document.entity'; // Importa CreditDocumentEntity

@Entity('credits')
export class CreditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @Column()
  term: number;

  @Column('decimal')
  income: number;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.credits)
  user: UserEntity;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.credits)
  institution: InstitutionEntity;

  @OneToMany(() => CreditDocumentEntity, (document) => document.credit) // Relación con CreditDocumentEntity
  documents: CreditDocumentEntity[]; // Propiedad documents
}
