import type { LLMsOptions } from '../types';
/**
 * Reads and parses JSON data from a local file.
 *
 * @param filePath - The path to the local JSON file
 * @returns A Promise that resolves to the parsed JSON data
 * @throws {Error} When the file cannot be read or parsed
 *
 * @example
 * ```typescript
 * const data = await parseFromFile('path/to/file.json');
 * console.log(data);
 * ```
 */
export declare const parseFromFile: (filePath: string) => Promise<any>;
/**
 * Fetches and parses JSON data from a given URL.
 *
 * @param url - The URL to fetch data from
 * @returns A Promise that resolves to the parsed JSON data
 * @throws {Error} When the HTTP request fails or when the URL cannot be fetched
 *
 * @example
 * ```typescript
 * const data = await parseFromUrl('https://api.example.com/data');
 * console.log(data);
 * ```
 */
export declare const parseFromUrl: (url: string) => Promise<any>;
/**
 * Validates the provided options for Large Language Model (LLM) processing.
 *
 * @param options - The configuration options to validate
 * @throws {Error} When required fields are missing or invalid
 *
 * @example
 * ```typescript
 * validateOptions({
 *     source: {
 *         type: 'file',
 *         file: 'path/to/file.json'
 *     }
 * });
 * ```
 */
export declare const validateOptions: (options: LLMsOptions) => void;
//# sourceMappingURL=index.d.ts.map