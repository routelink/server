import { MessageResponse } from './response';

export interface ErrorResponse extends MessageResponse {
  stack?: string[];
}
