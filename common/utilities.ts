/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as Path from 'path';
import * as URL from 'url';

const _formatPIIRegexp = /{([^}]+)}/g;

export function formatPII(format:string, excludePII: boolean, args: {[key: string]: string}): string {
	return format.replace(_formatPIIRegexp, function(match, paramName) {
		if (excludePII && paramName.length > 0 && paramName[0] !== '_') {
			return match;
		}
		return args[paramName] && args.hasOwnProperty(paramName) ?
			args[paramName] :
			match;
	})
}

export function random(low: number, high: number): number {
	return Math.floor(Math.random() * (high - low) + low);
}

export function isArray(what: any): boolean {
	return Object.prototype.toString.call(what) === '[object Array]';
}

export function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export function getPathRoot(p: string) {
	if (p) {
		if (p.length >= 3 && p[1] === ':' && p[2] === '\\' && ((p[0] >= 'a' && p[0] <= 'z') || (p[0] >= 'A' && p[0] <= 'Z'))) {
			return p.substr(0, 3);
		}
		if (p.length > 0 && p[0] === '/') {
			return '/';
		}
	}
	return null;
}

export function makePathAbsolute(absPath: string, relPath: string): string {
	return Path.resolve(Path.dirname(absPath), relPath);
}

export function removeFirstSegment(path: string) {
	const segments = path.split(Path.sep);
	segments.shift();
	if (segments.length > 0) {
		return segments.join(Path.sep);
	}
	return null;
}

export function makeRelative(target: string, path: string) {
	const t = target.split(Path.sep);
	const p = path.split(Path.sep);

	let i = 0;
	for (; i < Math.min(t.length, p.length) && t[i] === p[i]; i++) {
	}

	let result = '';
	for (; i < p.length; i++) {
		result = Path.join(result, p[i]);
	}
	return result;
}

export function extendObject<T> (objectCopy: T, object: T): T {

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            objectCopy[key] = object[key];
        }
    }

    return objectCopy;
}

export function canonicalizeUrl(url: string): string {
	let u = URL.parse(url);
	let p = u.pathname;

	if (p.length >= 4 && p[0] === '/' && p[2] === ':' && p[3] === '/' && ((p[1] >= 'a' && p[1] <= 'z') || (p[1] >= 'A' && p[1] <= 'Z'))) {
		return p.substr(1);
	}
	return p;
}
