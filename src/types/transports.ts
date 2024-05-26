import { IMetaContext } from '@app/types/base';

export interface ITransport extends IMetaContext {
  name: string;
  typeId: number;
  regNumber?: string;
  avgConsumption?: number;
  orgId?: number;
  unit?: string;
}
export type GetTransportsPayload = {
  page: number;
  count: number;
  search?: string;
  sortBy?: string;
  sortOrder: 'ASC' | 'DESC';
};
