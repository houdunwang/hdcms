import * as nodeUrl from 'url';
import * as nodePath from 'path';

const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

export const getDirname = (url: string) => {
	if (!isNode) {
		return url;
	}
	return nodePath.dirname(nodeUrl.fileURLToPath(url));
};

export const getFilename = (url: string) => {
	if (!isNode) {
		return url;
	}
	return nodeUrl.fileURLToPath(url);
};

export const pathResolve = (url: string, ...paths: string[]) => {
	if (!isNode) {
		return url;
	}
	return nodePath.resolve(getDirname(url), ...paths);
};
