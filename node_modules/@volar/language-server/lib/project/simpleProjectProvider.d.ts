import type { ServiceEnvironment } from '@volar/language-service';
import type { ServerProjectProviderFactory } from '../types';
import type { ServerContext } from '../server';
import type { UriMap } from '../utils/uriMap';
export declare function createSimpleProjectProviderFactory(): ServerProjectProviderFactory;
export declare function createServiceEnvironment(context: ServerContext, workspaceFolder: string): ServiceEnvironment;
export declare function getWorkspaceFolder(uri: string, workspaceFolders: UriMap<boolean>): string;
