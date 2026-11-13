import 'react';

export interface WebMcpToolAnnotation {
  readOnlyHint?: boolean;
  destructiveHint?: boolean;
  idempotentHint?: boolean;
  openWorldHint?: boolean;
}

export interface WebMcpToolSchemaProperty {
  type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';
  description?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface WebMcpToolInputSchema {
  type: 'object';
  properties: Record<string, WebMcpToolSchemaProperty>;
  required?: string[];
  additionalProperties?: boolean;
}

export interface WebMcpToolExecutionResult {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
}

export interface WebMcpToolDefinition {
  name: string;
  description: string;
  inputSchema: WebMcpToolInputSchema;
  annotations?: WebMcpToolAnnotation;
  execute: (input: Record<string, unknown>, client?: unknown) => Promise<WebMcpToolExecutionResult> | WebMcpToolExecutionResult;
}

export interface ModelContextContainer {
  registerTool?: (tool: WebMcpToolDefinition) => void;
  unregisterTool?: (name: string) => void;
  provideContext?: (options: { tools: WebMcpToolDefinition[] }) => void;
  clearContext?: () => void;
}

declare global {
  interface Navigator {
    modelContext?: ModelContextContainer;
  }
  interface Document {
    modelContext?: ModelContextContainer;
  }
}

declare module 'react' {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: string | boolean;
  }
  interface InputHTMLAttributes<T> {
    toolparamdescription?: string;
    toolparamtitle?: string;
  }
  interface SelectHTMLAttributes<T> {
    toolparamdescription?: string;
    toolparamtitle?: string;
  }
  interface TextareaHTMLAttributes<T> {
    toolparamdescription?: string;
    toolparamtitle?: string;
  }
}
