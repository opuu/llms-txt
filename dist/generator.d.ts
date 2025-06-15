/**
 * Converts an OpenAPI specification object into a Markdown string.
 */
export default class OpenAPIToMarkdownConverter {
    /**
     * The OpenAPI specification object.
     */
    private spec;
    /**
     * Creates an instance of OpenAPIToMarkdownConverter.
     * @param openApiSpec - The OpenAPI specification object.
     */
    constructor(openApiSpec: any);
    /**
     * Converts the OpenAPI specification to a Markdown string.
     * @returns The Markdown representation of the OpenAPI specification.
     */
    convert(): string;
    /**
     * Generates the title section of the Markdown document.
     * @returns The Markdown string for the title, or an empty string if no title is present.
     */
    private generateTitle;
    /**
     * Generates the description section of the Markdown document.
     * @returns The Markdown string for the description, or an empty string if no description is present.
     */
    private generateDescription;
    /**
     * Generates the contact information section of the Markdown document.
     * @returns The Markdown string for contact information, or an empty string if no contact info is present.
     */
    private generateContact;
    /**
     * Generates the license information section of the Markdown document.
     * @returns The Markdown string for license information, or an empty string if no license info is present.
     */
    private generateLicense;
    /**
     * Generates the external documentation section of the Markdown document.
     * @returns The Markdown string for external documentation, or an empty string if no external docs are present.
     */
    private generateExternalDocs;
    /**
     * Generates the servers section of the Markdown document.
     * @returns The Markdown string for server information, or an empty string if no servers are defined.
     */
    private generateServers;
    /**
     * Generates the security requirements section of the Markdown document.
     * @returns The Markdown string for security requirements, or an empty string if no security requirements are defined.
     */
    private generateSecurity;
    /**
     * Generates the tags section of the Markdown document.
     * @returns The Markdown string for tags, or an empty string if no tags are defined.
     */
    private generateTags;
    /**
     * Generates the paths (endpoints) section of the Markdown document.
     * @returns The Markdown string for API paths, or an empty string if no paths are defined.
     */
    private generatePaths;
    /**
     * Generates the webhooks section of the Markdown document.
     * @returns The Markdown string for webhooks, or an empty string if no webhooks are defined.
     */
    private generateWebhooks;
    /**
     * Generates the Markdown for a single API endpoint or webhook operation.
     * @param path - The API path (empty for webhooks).
     * @param method - The HTTP method (e.g., GET, POST).
     * @param operation - The OpenAPI operation object.
     * @returns The Markdown string for the endpoint.
     */
    private generateEndpoint;
    /**
     * Generates the security requirements for a specific endpoint.
     * @param security - An array of security requirement objects for the endpoint.
     * @returns The Markdown string for endpoint security.
     */
    private generateEndpointSecurity;
    /**
     * Generates the parameters table for an endpoint.
     * @param parameters - An array of parameter objects.
     * @returns The Markdown string for the parameters table.
     */
    private generateParameters;
    /**
     * Gets the type of a parameter, resolving schema references if necessary.
     * @param param - The parameter object.
     * @returns The string representation of the parameter type.
     */
    private getParameterType;
    /**
     * Gets the type from a schema object, handling arrays and references.
     * @param schema - The schema object.
     * @returns The string representation of the schema type.
     */
    private getSchemaType;
    /**
     * Generates the request body section for an endpoint.
     * @param requestBody - The request body object.
     * @returns The Markdown string for the request body.
     */
    private generateRequestBody;
    /**
     * Generates the responses section for an endpoint.
     * @param responses - The responses object from the OpenAPI spec.
     * @returns The Markdown string for the responses.
     */
    private generateResponses;
    /**
     * Generates the callbacks section for an endpoint.
     * @param callbacks - The callbacks object from the OpenAPI spec.
     * @returns The Markdown string for the callbacks.
     */
    private generateCallbacks;
    /**
     * Generates the components section of the Markdown document.
     * @returns The Markdown string for components, or an empty string if no components are defined.
     */
    private generateComponents;
    /**
     * Generates the schemas component section.
     * @returns The Markdown string for schemas, or an empty string if no schemas are defined.
     */
    private generateSchemas;
    /**
     * Generates the security schemes component section.
     * @returns The Markdown string for security schemes, or an empty string if no security schemes are defined.
     */
    private generateSecuritySchemes;
    /**
     * Generates the response components section.
     * @returns The Markdown string for response components, or an empty string if no response components are defined.
     */
    private generateResponseComponents;
    /**
     * Generates the parameter components section.
     * @returns The Markdown string for parameter components, or an empty string if no parameter components are defined.
     */
    private generateParameterComponents;
    /**
     * Generates the example components section.
     * @returns The Markdown string for example components, or an empty string if no example components are defined.
     */
    private generateExampleComponents;
    /**
     * Generates the request body components section.
     * @returns The Markdown string for request body components, or an empty string if no request body components are defined.
     */
    private generateRequestBodyComponents;
    /**
     * Generates the header components section.
     * @returns The Markdown string for header components, or an empty string if no header components are defined.
     */
    private generateHeaderComponents;
    /**
     * Generates the link components section.
     * @returns The Markdown string for link components, or an empty string if no link components are defined.
     */
    private generateLinkComponents;
}
//# sourceMappingURL=generator.d.ts.map