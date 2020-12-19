import { DynamicModule, Module } from "@nestjs/common";
import { TenancyModuleOptions } from "./interface/tenancy-options.interface";
import { TenancyRootModule } from "./tenancy-root.module";
import { ModelDefinition } from "./interface/model-definition.interface";
import { TenancyFeatureModule } from "./tenancy-feature.module";

@Module({})
export class TenancyModule {
  static forRoot(options: TenancyModuleOptions): DynamicModule {
    return {
      module: TenancyModule,
      imports: [TenancyRootModule.register(options)],
    }
  }

  static forFeature(models: ModelDefinition[]): DynamicModule {
    return {
      module: TenancyModule,
      imports: [TenancyFeatureModule.register(models)],
    };
  }
}