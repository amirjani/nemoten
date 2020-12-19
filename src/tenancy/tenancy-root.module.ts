import { DynamicModule, Global, Module, OnApplicationShutdown, Scope } from "@nestjs/common";
import { ModuleRef, REQUEST } from "@nestjs/core";
import { ConnectionMap, ModelDefinitionMap } from "./types";
import { CONNECTION_MAP, MODEL_DEFINITION_MAP, TENANT_CONNECTION, TENANT_MODULE_OPTIONS } from "./tenancy.constants";
import { Request } from "express";
import * as mongoose from 'mongoose';

@Global()
@Module({})
export class TenancyRootModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  // connection should be closed on shutdown
  async onApplicationShutdown(signal?: string): Promise<any> {
    const connectionMap: ConnectionMap = this.moduleRef.get(CONNECTION_MAP);
    await Promise.all(
      [...connectionMap.values()].map(connection => connection.close())
    );
  }

  static register(options: any): DynamicModule {
    const tenancyModuleOptions = {
      provide: TENANT_MODULE_OPTIONS,
      useValue: { ...options }
    }

    const connectionMap = {
      provide: CONNECTION_MAP,
      useFactory: (): ConnectionMap => new Map(),
    }

    const modelDefinitionMap = {
      provide: MODEL_DEFINITION_MAP,
      useFactory: (): ModelDefinitionMap => new Map()
    }

    const tenantConnection = {
      inject: [
        REQUEST,
        TENANT_MODULE_OPTIONS,
        CONNECTION_MAP,
        MODEL_DEFINITION_MAP
      ],
      provide: TENANT_CONNECTION,
      scope: Scope.REQUEST,
      useFactory: async (
        req: Request,
        options: any,
        connectionMap: ConnectionMap,
        modelDefinitionMap: ModelDefinitionMap
      ): Promise<mongoose.Connection> => {
        const tenantId = options.tenatId(req);
        const exists = connectionMap.has(tenantId);
        if (exists) {
          return connectionMap.get(tenantId);
        }
        const connection = mongoose.createConnection(options.uri(tenantId), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          ...options.options(tenantId)
        });

        modelDefinitionMap.forEach(definition => {
          const { name, schema, collection } = definition;
          connection.model(name, schema, collection);
        })
        connectionMap.set(tenantId, connection);
        return connection;
      },
    };

    const providers = {
      modelDefinitionMap,
      tenancyModuleOptions,
      tenantConnection,
      connectionMap
    }

    return {
      module: TenancyRootModule,
      // @ts-ignore
      providers,
      // @ts-ignore
      exports: providers
    }



  }

}