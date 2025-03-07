import { Org } from '../entities/org.ts';

export interface OrgRepository {
  findByEmail(email: string): Promise<Org | null>;
}