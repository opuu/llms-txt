import { Elysia } from 'elysia'
import OpenAPIToMarkdownConverter from './generator';
import { parseFromFile, parseFromUrl, validateOptions } from './utils';
import type { LLMsOptions } from './types';

export const llms = (options: LLMsOptions = {
    source: {
        type: 'url',
        url: '/swagger/json',
    },
    contentType: 'text/markdown',
}) => {
    return new Elysia({ name: 'llms.txt' })
        .get('/llms.txt', async ({ set, server }) => {
            try {
                validateOptions(options);

                const { source, header, footer } = options;

                let input;

                if (source.type === 'file' && source.file) {
                    input = await parseFromFile(source.file);
                } else if (source.type === 'url' && source.url) {
                    const url = source.url.startsWith('http://') || source.url.startsWith('https://')
                        ? source.url
                        : new URL(source.url, server?.url).href;

                    input = await parseFromUrl(url);
                } else {
                    throw new Error('Invalid source configuration');
                }

                const markdownType = options.contentType;
                set.headers['Content-Type'] = `${markdownType}; charset=utf-8`;

                const converter = new OpenAPIToMarkdownConverter(input);
                let output = converter.convert();

                if (header) {
                    output = `${header}\n\n${output}`;
                }

                if (footer) {
                    output = `${output}\n\n${footer}`;
                }

                return output;
            } catch (error) {
                set.status = 500;
                return `Error generating LLMs documentation: ${error instanceof Error ? error.message : 'Unknown error'}`;
            }
        })
        .get('/llms-full.txt', async ({ set, redirect }) => {
            return redirect('/llms.txt', 301);
        });
}

export default llms;

export type { LLMsOptions };
