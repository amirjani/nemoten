import { ModelDefinition } from "../interface/model-definition.interface";
import { Provider, Scope } from "@nestjs/common";
import { CONNECTION_MAP, MODEL_DEFINITION_MAP, TENANT_CONNECTION } from "../tenancy.constants";
import { getTenantModelDefinitionToken, getTenantModelToken } from "../util/tenancy.util";
import { ConnectionMap, ModelDefinitionMap } from "../types";
import * as mongoose from 'mongoose';

export const createProviders = (definition: ModelDefinition[]): Provider[] => {
  const providers: Provider[] = [];

  definition.forEach(definition => {
    const { name, schema, collection } = definition;

    providers.push({
      inject: [
        MODEL_DEFINITION_MAP,
        CONNECTION_MAP
      ],
      provide: getTenantModelDefinitionToken(name),
      useFactory: (
        modelDefinitionMap: ModelDefinitionMap,
        connectionMap: ConnectionMap,
      ) => {
        const exists: boolean = modelDefinitionMap.has(name);
        if (!exists) {
          modelDefinitionMap.set(name, { ...definition });
          connectionMap.forEach(connection => {
            connection.model(name, schema, collection);
          });
        }
      }
    })

    providers.push({
      inject: [TENANT_CONNECTION],
      provide: getTenantModelToken(name),
      scope: Scope.REQUEST,
      useFactory: (tenantConnection: mongoose.Connection) => {
        tenantConnection.model(name)
      }
    })
  });

  return providers;
}