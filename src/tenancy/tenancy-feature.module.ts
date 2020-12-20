import { DynamicModule, Global, Module } from "@nestjs/common";
import { ModelDefinition } from "./interface/model-definition.interface";
import { createProviders } from "./factory";

@Global()
@Module({})
export class TenancyFeatureModule {
  static register(models: ModelDefinition[]): DynamicModule {
    const providers = createProviders(models)

    return {
      module: TenancyFeatureModule,
      providers,
      exports: providers,
    }
  }
}