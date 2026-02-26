export interface OssUploadSuccessResponse {
  name: string;
  url: string;
  res: {
    status: number;
    statusCode: number;
    statusMessage: string;
    headers: {
      server: string;
      date: string;
      'content-length': string;
      connection: string;
      'x-oss-request-id': string;
      etag: string;
      'x-oss-hash-crc64ecma': string;
      'content-md5': string;
      'x-oss-server-time': string;
    };
    size: number;
    aborted: boolean;
    rt: number;
    keepAliveSocket: boolean;
    data: {
      type: 'Buffer';
      data: any[];
    };
    requestUrls: string[];
    timing: any;
    remoteAddress: string;
    remotePort: number;
    socketHandledRequests: number;
    socketHandledResponses: number;
  };
}
