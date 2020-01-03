/// <reference types="node" />

declare const tempWrite: {
	/**
	Write string/buffer/stream to a random temp file.

	@param fileContent - Data to write to the temp file.
	@param filePath - Optionally supply a file path which is appended to the random path. Example: `'img.png'` `'foo/bar/baz.png'`.
	@returns The file path of the temp file.

	@example
	```
	import {promisify} from 'util';
	import * as fs from 'fs';
	import tempWrite = require('temp-write');

	(async () => {
		const filePath = await tempWrite('unicorn');
		//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b'

		await promisify(fs.readFile(filePath, 'utf8'));
		//=> 'unicorn'


		await tempWrite('unicorn', 'pony.png');
		//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b/pony.png'

		await tempWrite('unicorn', 'rainbow/cake/pony.png');
		//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b/rainbow/cake/pony.png'
	})();
	```
	*/
	(fileContent: string | Buffer | NodeJS.ReadableStream, filePath?: string): Promise<string>;

	/**
	Synchronously write string/buffer/stream to a random temp file.

	@param fileContent - Data to write to the temp file.
	@param filePath - Optionally supply a file path which is appended to the random path. Example: `'img.png'` `'foo/bar/baz.png'`.
	@returns The file path of the temp file.

	@example
	```
	import * as fs from 'fs';
	import tempWrite = require('temp-write');

	const filePath = tempWrite.sync('unicorn');
	//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b'

	fs.readFileSync(filePath, 'utf8');
	//=> 'unicorn'


	tempWrite.sync('unicorn', 'pony.png');
	//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b/pony.png'

	tempWrite.sync('unicorn', 'rainbow/cake/pony.png');
	//=> '/var/folders/_1/tk89k8215ts0rg0kmb096nj80000gn/T/4049f192-43e7-43b2-98d9-094e6760861b/rainbow/cake/pony.png'
	```
	*/
	sync(fileContent: string | Buffer, filePath?: string): string;
}

export = tempWrite;
