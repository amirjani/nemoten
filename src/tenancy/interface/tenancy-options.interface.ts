import { ModuleMetadata, Type } from "@nestjs/common";

export interface TenancyModuleOptions extends Record<string, any> {
  /**
   * If `true`, tenant id will be extracted from the subdomain
   */
  isTenantFromSubdomain?: boolean;

  /**
   * Tenant id will be extracted using the keyword from the request header
   */
  tenantIdentifier?: string;

  /**
   * URI for the tenant database
   */
  uri: (uri: string) => string;

  /**
   * Options for the database
   */
  options?: any;

  /**
   * Whitelist following subdomains
   */
  whitelist?: any;
}

export interface TenancyOptionsFactory {
  createTenancyOptions():Promise<TenancyModuleOptions> | TenancyModuleOptions;
}

export interface TenancyModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<TenancyOptionsFactory>;
  useClass?: Type<TenancyOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<TenancyModuleOptions> | TenancyModuleOptions;
  inject?: any[];
}