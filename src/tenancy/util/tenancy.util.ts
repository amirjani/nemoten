import { DEFAULT_TENANT_DB_CONNECTION } from "../tenancy.constants";

export function getTenantModelToken(model: string) {
  return `${model}Model`;
}

export function getTenantModelDefinitionToken(model: string) {
  return `${model}Definition`
}

export function getTenantId(headers: any): string{
  return headers['tenantId'];
}

export function getTenantConnectionToken(name?: string) {
  return name && name !== DEFAULT_TENANT_DB_CONNECTION
    ? `${name}TenantConnection`
    : DEFAULT_TENANT_DB_CONNECTION;
}
