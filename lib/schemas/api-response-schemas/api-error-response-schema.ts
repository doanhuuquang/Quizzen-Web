export default interface ApiErrorResponseSchema {
  statusCode: number;
  error: string;
  message: string;
  timestamp: Date;
}
