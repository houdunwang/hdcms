import { env } from "../core/env";

export const upload = {
	driverDisk: env('UPLOAD_DISK', 'fs'),
	driver: env('UPLOAD_DRIVER', 'local'),
	ossRegion: env('UPLOAD_OSS_REGION', ''),
	ossBucket: env('UPLOAD_OSS_BUCKET', ''),
	ossEndPoint: env('UPLOAD_OSS_END_POINT', ''),
}