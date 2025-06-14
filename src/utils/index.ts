import { readFile } from 'fs/promises';
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
export const parseFromFile = async (filePath: string): Promise<any> => {
    try {
        const content = await readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`Failed to read file: ${filePath}. ${error}`);
    }
}

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
export const parseFromUrl = async (url: string): Promise<any> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch URL: ${url}. ${error}`);
    }
}

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
export const validateOptions = (options: LLMsOptions): void => {
    const { source } = options;

    if (source.type === 'file' && !source.file) {
        throw new Error('File path is required when source type is "file"');
    }

    if (source.type === 'url' && !source.url) {
        throw new Error('URL is required when source type is "url"');
    }
}