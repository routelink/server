import { IMetaContext } from '@app/types/base';

export interface ITransport extends IMetaContext {
  name: string;
  type: number;
  regNumber?: string;
  avgConsumption?: number;
  organisation?: number;
  unit?: string;
  mileage?: string;
}
export type GetTransportsPayload = {
  page: number;
  count: number;
  search?: string;
  sortBy?: string;
  sortOrder: 'ASC' | 'DESC';
};
