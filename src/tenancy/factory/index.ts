import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { CONNECTION_MAP, MODEL_DEFINITION_MAP, TENANT_CONNECTION } from '../tenancy.constants';
import { ConnectionMap, ModelDefinitionMap } from '../types';
import { ModelDefinition } from "../interface/model-definition.interface";
import { getTenantModelDefinitionToken, getTenantModelToken } from "../util";

export const createProviders = (definitions: ModelDefinition[]): Provider[] => {
  const providers: Provider[] = [];

  for (const definition of definitions) {
    const { name, schema, collection } = definition;

    // providers.push({
    //   provide: getTenantModelDefinitionToken(name),
    //   useFactory: (
    //     modelDefinitionMap: ModelDefinitionMap,
    //     connectionMap: ConnectionMap,
    //   ) => {
    //     const exists = modelDefinitionMap.has(name);
    //     console.log("ModelDefinitionMap: ", modelDefinitionMap);
    //     if (!exists) {
    //       console.log("ModelDefinitionMap: ", modelDefinitionMap);
          
    //       modelDefinitionMap.set(name, { ...definition });

    //       connectionMap.forEach((connection: Connection) => {
    //         connection.model(name, schema, collection);
    //       });
    //     }
    //   },
    //   inject: [
    //     MODEL_DEFINITION_MAP,
    //     CONNECTION_MAP,
    //   ],
    // });

    providers.push({
      provide: getTenantModelToken(name),
      useFactory(tenantConnection: Connection) {
        console.log("REGISTER MODEL: ", name);
        
        return tenantConnection.model(name, schema, collection);
      },
      inject: [TENANT_CONNECTION],
    });
  }

  console.log(providers);
  
  return providers;
};