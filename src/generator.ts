/**
 * Converts an OpenAPI specification object into a Markdown string.
 */
export default class OpenAPIToMarkdownConverter {
    /**
     * The OpenAPI specification object.
     */
    private spec: any;

    /**
     * Creates an instance of OpenAPIToMarkdownConverter.
     * @param openApiSpec - The OpenAPI specification object.
     */
    constructor(openApiSpec: any) {
        this.spec = openApiSpec;
    }

    /**
     * Converts the OpenAPI specification to a Markdown string.
     * @returns The Markdown representation of the OpenAPI specification.
     */
    public convert(): string {
        const sections = [
            this.generateTitle(),
            this.generateDescription(),
            this.generateContact(),
            this.generateLicense(),
            this.generateExternalDocs(),
            this.generateServers(),
            this.generateSecurity(),
            this.generateTags(),
            this.generatePaths(),
            this.generateWebhooks(),
            this.generateComponents()
        ];

        return sections.filter(Boolean).join('\n\n');
    }

    /**
     * Generates the title section of the Markdown document.
     * @returns The Markdown string for the title, or an empty string if no title is present.
     */
    private generateTitle(): string {
        const title = this.spec.info?.title || 'API Documentation';
        const version = this.spec.info?.version || '';
        return `# ${title}${version ? ` (v${version})` : ''}`;
    }

    /**
     * Generates the description section of the Markdown document.
     * @returns The Markdown string for the description, or an empty string if no description is present.
     */
    private generateDescription(): string {
        return this.spec.info?.description ? this.spec.info.description : '';
    }

    /**
     * Generates the contact information section of the Markdown document.
     * @returns The Markdown string for contact information, or an empty string if no contact info is present.
     */
    private generateContact(): string {
        if (!this.spec.info?.contact) return '';

        const contact = this.spec.info.contact;
        let contactInfo = '## Contact\n\n';

        if (contact.name) contactInfo += `**Name**: ${contact.name}\n\n`;
        if (contact.email) contactInfo += `**Email**: ${contact.email}\n\n`;
        if (contact.url) contactInfo += `**URL**: ${contact.url}\n\n`;

        return contactInfo;
    }

    /**
     * Generates the license information section of the Markdown document.
     * @returns The Markdown string for license information, or an empty string if no license info is present.
     */
    private generateLicense(): string {
        if (!this.spec.info?.license) return '';

        const license = this.spec.info.license;
        let licenseInfo = '## License\n\n';
        licenseInfo += `**${license.name}**`;
        if (license.url) licenseInfo += ` - ${license.url}`;

        return licenseInfo;
    }

    /**
     * Generates the external documentation section of the Markdown document.
     * @returns The Markdown string for external documentation, or an empty string if no external docs are present.
     */
    private generateExternalDocs(): string {
        if (!this.spec.externalDocs) return '';

        const docs = this.spec.externalDocs;
        return `## External Documentation\n\n${docs.description || 'Additional documentation'}: ${docs.url}`;
    }

    /**
     * Generates the servers section of the Markdown document.
     * @returns The Markdown string for server information, or an empty string if no servers are defined.
     */
    private generateServers(): string {
        if (!this.spec.servers?.length) return '';

        const serverList = this.spec.servers
            .map((server: any) => {
                let serverStr = `- ${server.url}`;
                if (server.description) serverStr += ` - ${server.description}`;

                if (server.variables) {
                    serverStr += '\n  - Variables:';
                    for (const [name, variable] of Object.entries(server.variables)) {
                        const v = variable as any;
                        serverStr += `\n    - \`${name}\`: ${v.description || ''} (default: \`${v.default}\`)`;
                    }
                }
                return serverStr;
            })
            .join('\n');

        return `## Servers\n\n${serverList}`;
    }

    /**
     * Generates the security requirements section of the Markdown document.
     * @returns The Markdown string for security requirements, or an empty string if no security requirements are defined.
     */
    private generateSecurity(): string {
        if (!this.spec.security?.length) return '';

        let security = '## Security\n\n';

        this.spec.security.forEach((requirement: any, index: number) => {
            security += `### Requirement ${index + 1}\n\n`;
            for (const [name, scopes] of Object.entries(requirement)) {
                security += `- **${name}**`;
                if (Array.isArray(scopes) && scopes.length > 0) {
                    security += ` (scopes: ${scopes.join(', ')})`;
                }
                security += '\n';
            }
            security += '\n';
        });

        return security;
    }

    /**
     * Generates the tags section of the Markdown document.
     * @returns The Markdown string for tags, or an empty string if no tags are defined.
     */
    private generateTags(): string {
        if (!this.spec.tags?.length) return '';

        let tags = '## Tags\n\n';

        this.spec.tags.forEach((tag: any) => {
            tags += `### ${tag.name}\n\n`;
            if (tag.description) tags += `${tag.description}\n\n`;
            if (tag.externalDocs) {
                tags += `External Docs: ${tag.externalDocs.url}\n\n`;
            }
        });

        return tags;
    }

    /**
     * Generates the paths (endpoints) section of the Markdown document.
     * @returns The Markdown string for API paths, or an empty string if no paths are defined.
     */
    private generatePaths(): string {
        if (!this.spec.paths) return '';

        let pathsMarkdown = '## Endpoints\n\n';

        for (const [path, methods] of Object.entries(this.spec.paths)) {
            for (const [method, operation] of Object.entries(methods as any)) {
                if (typeof operation === 'object' && operation !== null && method !== 'parameters') {
                    pathsMarkdown += this.generateEndpoint(path, method.toUpperCase(), operation);
                }
            }
        }

        return pathsMarkdown;
    }

    /**
     * Generates the webhooks section of the Markdown document.
     * @returns The Markdown string for webhooks, or an empty string if no webhooks are defined.
     */
    private generateWebhooks(): string {
        if (!this.spec.webhooks) return '';

        let webhooks = '## Webhooks\n\n';

        for (const [name, webhook] of Object.entries(this.spec.webhooks)) {
            webhooks += `### ${name}\n\n`;
            for (const [method, operation] of Object.entries(webhook as any)) {
                if (typeof operation === 'object' && operation !== null) {
                    webhooks += this.generateEndpoint('', method.toUpperCase(), operation);
                }
            }
        }

        return webhooks;
    }

    /**
     * Generates the Markdown for a single API endpoint or webhook operation.
     * @param path - The API path (empty for webhooks).
     * @param method - The HTTP method (e.g., GET, POST).
     * @param operation - The OpenAPI operation object.
     * @returns The Markdown string for the endpoint.
     */
    private generateEndpoint(path: string, method: string, operation: any): string {
        const summary = operation.summary || `${method} ${path}`;
        const description = operation.description || '';

        let endpoint = `### ${summary}\n\n`;
        if (path) endpoint += `**${method}** \`${path}\`\n\n`;

        if (operation.tags?.length) {
            endpoint += `**Tags**: ${operation.tags.join(', ')}\n\n`;
        }

        if (description) {
            endpoint += `${description}\n\n`;
        }

        if (operation.operationId) {
            endpoint += `**Operation ID**: \`${operation.operationId}\`\n\n`;
        }

        if (operation.deprecated) {
            endpoint += `**⚠️ DEPRECATED**\n\n`;
        }

        if (operation.security) {
            endpoint += this.generateEndpointSecurity(operation.security);
        }

        if (operation.parameters?.length) {
            endpoint += this.generateParameters(operation.parameters);
        }

        if (operation.requestBody) {
            endpoint += this.generateRequestBody(operation.requestBody);
        }

        if (operation.responses) {
            endpoint += this.generateResponses(operation.responses);
        }

        if (operation.callbacks) {
            endpoint += this.generateCallbacks(operation.callbacks);
        }

        return endpoint + '\n';
    }

    /**
     * Generates the security requirements for a specific endpoint.
     * @param security - An array of security requirement objects for the endpoint.
     * @returns The Markdown string for endpoint security.
     */
    private generateEndpointSecurity(security: any[]): string {
        let sec = '#### Security\n\n';

        security.forEach((requirement: any, index: number) => {
            sec += `- Requirement ${index + 1}:\n`;
            for (const [name, scopes] of Object.entries(requirement)) {
                sec += `  - **${name}**`;
                if (Array.isArray(scopes) && scopes.length > 0) {
                    sec += ` (scopes: ${scopes.join(', ')})`;
                }
                sec += '\n';
            }
        });

        return sec + '\n';
    }

    /**
     * Generates the parameters table for an endpoint.
     * @param parameters - An array of parameter objects.
     * @returns The Markdown string for the parameters table.
     */
    private generateParameters(parameters: any[]): string {
        let params = '#### Parameters\n\n';
        params += '| Name | In | Type | Required | Description |\n';
        params += '|------|----|----- |----------|-------------|\n';

        parameters.forEach(param => {
            const required = param.required ? 'Yes' : 'No';
            const type = this.getParameterType(param);
            const description = param.description || '';
            params += `| ${param.name} | ${param.in} | ${type} | ${required} | ${description} |\n`;
        });

        return params + '\n';
    }

    /**
     * Gets the type of a parameter, resolving schema references if necessary.
     * @param param - The parameter object.
     * @returns The string representation of the parameter type.
     */
    private getParameterType(param: any): string {
        if (param.schema) {
            return this.getSchemaType(param.schema);
        }
        return param.type || 'string';
    }

    /**
     * Gets the type from a schema object, handling arrays and references.
     * @param schema - The schema object.
     * @returns The string representation of the schema type.
     */
    private getSchemaType(schema: any): string {
        if (schema.type) {
            if (schema.type === 'array' && schema.items) {
                return `array[${this.getSchemaType(schema.items)}]`;
            }
            return schema.type;
        }
        if (schema.$ref) {
            return schema.$ref.split('/').pop() || 'object';
        }
        return 'object';
    }

    /**
     * Generates the request body section for an endpoint.
     * @param requestBody - The request body object.
     * @returns The Markdown string for the request body.
     */
    private generateRequestBody(requestBody: any): string {
        let body = '#### Request Body\n\n';

        if (requestBody.description) {
            body += `${requestBody.description}\n\n`;
        }

        if (requestBody.required) {
            body += `**Required**: Yes\n\n`;
        }

        if (requestBody.content) {
            body += '**Content Types**:\n\n';
            for (const [mediaType, content] of Object.entries(requestBody.content)) {
                body += `- \`${mediaType}\`\n`;
                if ((content as any).schema) {
                    body += `  - Type: ${this.getSchemaType((content as any).schema)}\n`;
                }
            }
            body += '\n';
        }

        return body;
    }

    /**
     * Generates the responses section for an endpoint.
     * @param responses - The responses object from the OpenAPI spec.
     * @returns The Markdown string for the responses.
     */
    private generateResponses(responses: any): string {
        let resp = '#### Responses\n\n';

        for (const [code, response] of Object.entries(responses)) {
            const r = response as any;
            resp += `**${code}**: ${r.description || ''}\n\n`;

            if (r.headers) {
                resp += '  Headers:\n';
                for (const [headerName, header] of Object.entries(r.headers)) {
                    const h = header as any;
                    resp += `  - \`${headerName}\`: ${h.description || ''}\n`;
                }
                resp += '\n';
            }

            if (r.content) {
                resp += '  Content Types:\n';
                for (const [mediaType, content] of Object.entries(r.content)) {
                    resp += `  - \`${mediaType}\`\n`;
                    if ((content as any).schema) {
                        resp += `    - Type: ${this.getSchemaType((content as any).schema)}\n`;
                    }
                }
                resp += '\n';
            }
        }

        return resp;
    }

    /**
     * Generates the callbacks section for an endpoint.
     * @param callbacks - The callbacks object from the OpenAPI spec.
     * @returns The Markdown string for the callbacks.
     */
    private generateCallbacks(callbacks: any): string {
        let callbacksStr = '#### Callbacks\n\n';

        for (const [name, callback] of Object.entries(callbacks)) {
            callbacksStr += `**${name}**\n\n`;
            // Callbacks contain path expressions and operations
            for (const [expression, pathItem] of Object.entries(callback as any)) {
                callbacksStr += `- Expression: \`${expression}\`\n`;
                for (const [method, operation] of Object.entries(pathItem as any)) {
                    if (typeof operation === 'object' && operation !== null) {
                        callbacksStr += `  - ${method.toUpperCase()}: ${(operation as any).summary || ''}\n`;
                    }
                }
            }
            callbacksStr += '\n';
        }

        return callbacksStr;
    }

    /**
     * Generates the components section of the Markdown document.
     * @returns The Markdown string for components, or an empty string if no components are defined.
     */
    private generateComponents(): string {
        if (!this.spec.components) return '';

        const sections = [
            this.generateSchemas(),
            this.generateSecuritySchemes(),
            this.generateResponseComponents(),
            this.generateParameterComponents(),
            this.generateExampleComponents(),
            this.generateRequestBodyComponents(),
            this.generateHeaderComponents(),
            this.generateLinkComponents()
        ];

        return sections.filter(Boolean).join('\n\n');
    }

    /**
     * Generates the schemas component section.
     * @returns The Markdown string for schemas, or an empty string if no schemas are defined.
     */
    private generateSchemas(): string {
        if (!this.spec.components?.schemas) return '';

        let schemas = '## Schemas\n\n';

        for (const [name, schema] of Object.entries(this.spec.components.schemas)) {
            schemas += `### ${name}\n\n`;
            schemas += '```json\n';
            schemas += JSON.stringify(schema, null, 2);
            schemas += '\n```\n\n';
        }

        return schemas;
    }

    /**
     * Generates the security schemes component section.
     * @returns The Markdown string for security schemes, or an empty string if no security schemes are defined.
     */
    private generateSecuritySchemes(): string {
        if (!this.spec.components?.securitySchemes) return '';

        let schemes = '## Security Schemes\n\n';

        for (const [name, scheme] of Object.entries(this.spec.components.securitySchemes)) {
            const s = scheme as any;
            schemes += `### ${name}\n\n`;
            schemes += `**Type**: ${s.type}\n\n`;
            if (s.description) schemes += `${s.description}\n\n`;
            if (s.scheme) schemes += `**Scheme**: ${s.scheme}\n\n`;
            if (s.bearerFormat) schemes += `**Bearer Format**: ${s.bearerFormat}\n\n`;
            if (s.in) schemes += `**In**: ${s.in}\n\n`;
            if (s.name) schemes += `**Name**: ${s.name}\n\n`;
        }

        return schemes;
    }

    /**
     * Generates the response components section.
     * @returns The Markdown string for response components, or an empty string if no response components are defined.
     */
    private generateResponseComponents(): string {
        if (!this.spec.components?.responses) return '';

        let responses = '## Response Components\n\n';

        for (const [name, response] of Object.entries(this.spec.components.responses)) {
            responses += `### ${name}\n\n`;
            responses += `${(response as any).description || ''}\n\n`;
        }

        return responses;
    }

    /**
     * Generates the parameter components section.
     * @returns The Markdown string for parameter components, or an empty string if no parameter components are defined.
     */
    private generateParameterComponents(): string {
        if (!this.spec.components?.parameters) return '';

        let parameters = '## Parameter Components\n\n';

        for (const [name, param] of Object.entries(this.spec.components.parameters)) {
            const p = param as any;
            parameters += `### ${name}\n\n`;
            parameters += `**In**: ${p.in}\n\n`;
            parameters += `**Required**: ${p.required ? 'Yes' : 'No'}\n\n`;
            if (p.description) parameters += `${p.description}\n\n`;
        }

        return parameters;
    }

    /**
     * Generates the example components section.
     * @returns The Markdown string for example components, or an empty string if no example components are defined.
     */
    private generateExampleComponents(): string {
        if (!this.spec.components?.examples) return '';

        let examples = '## Example Components\n\n';

        for (const [name, example] of Object.entries(this.spec.components.examples)) {
            examples += `### ${name}\n\n`;
            if ((example as any).summary) examples += `**Summary**: ${(example as any).summary}\n\n`;
            if ((example as any).description) examples += `${(example as any).description}\n\n`;
        }

        return examples;
    }

    /**
     * Generates the request body components section.
     * @returns The Markdown string for request body components, or an empty string if no request body components are defined.
     */
    private generateRequestBodyComponents(): string {
        if (!this.spec.components?.requestBodies) return '';

        let requestBodies = '## Request Body Components\n\n';

        for (const [name, body] of Object.entries(this.spec.components.requestBodies)) {
            requestBodies += `### ${name}\n\n`;
            requestBodies += `${(body as any).description || ''}\n\n`;
        }

        return requestBodies;
    }

    /**
     * Generates the header components section.
     * @returns The Markdown string for header components, or an empty string if no header components are defined.
     */
    private generateHeaderComponents(): string {
        if (!this.spec.components?.headers) return '';

        let headers = '## Header Components\n\n';

        for (const [name, header] of Object.entries(this.spec.components.headers)) {
            headers += `### ${name}\n\n`;
            headers += `${(header as any).description || ''}\n\n`;
        }

        return headers;
    }

    /**
     * Generates the link components section.
     * @returns The Markdown string for link components, or an empty string if no link components are defined.
     */
    private generateLinkComponents(): string {
        if (!this.spec.components?.links) return '';

        let links = '## Link Components\n\n';

        for (const [name, link] of Object.entries(this.spec.components.links)) {
            links += `### ${name}\n\n`;
            if ((link as any).description) links += `${(link as any).description}\n\n`;
        }

        return links;
    }
}