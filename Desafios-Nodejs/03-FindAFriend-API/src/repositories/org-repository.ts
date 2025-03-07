import { Org } from '../entities/org.ts';

export interface OrgRepository {
  findByEmail(email: string): Promise<Org | null>;
  create(data: Omit<Org, 'id'>): Promise<Org>;
}