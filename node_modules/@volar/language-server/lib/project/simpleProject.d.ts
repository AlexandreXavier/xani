import { ServiceEnvironment, ServicePlugin } from '@volar/language-service';
import type { ServerContext, ServerOptions } from '../server';
import type { ServerProject } from '../types';
export declare function createSimpleServerProject(context: ServerContext, serviceEnv: ServiceEnvironment, servicePlugins: ServicePlugin[], getLanguagePlugins: ServerOptions['getLanguagePlugins']): Promise<ServerProject>;
