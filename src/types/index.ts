/**
 * Configuration options for Large Language Model (LLM) processing.
 * 
 * @interface LLMsOptions
 */
/**
 * Optional header content to prepend to the processed output.
 * 
 * @type {string}
 * @optional
 */
/**
 * Optional footer content to append to the processed output.
 * 
 * @type {string}
 * @optional
 */
/**
 * Source configuration specifying where to retrieve the content from.
 * 
 * @type {object}
 */
/**
 * The type of source - either a local file or a remote URL.
 * 
 * @type {"file" | "url"}
 */
/**
 * Path to the local file when source type is "file".
 * 
 * @type {string}
 * @optional
 */
/**
 * URL to the remote resource when source type is "url".
 * 
 * @type {string}
 * @optional
 */
/**
 * The MIME type of the content being processed.
 * Defaults to markdown if not specified.
 * 
 * @type {"text/markdown" | "text/plain"}
 * @optional
 * @default "text/markdown"
 */
export interface LLMsOptions {
    header?: string;
    footer?: string;
    source: {
        type: "file" | "url";
        file?: string;
        url?: string;
    };
    contentType?: 'text/markdown' | 'text/plain';
}