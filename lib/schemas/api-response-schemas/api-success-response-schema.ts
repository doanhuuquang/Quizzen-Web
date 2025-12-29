export default interface ApiSuccessResponseSchema<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
  timestamp: Date;
}
