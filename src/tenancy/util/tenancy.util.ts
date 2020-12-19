export function getTenantModelToken(model: string) {
  return `${model}Model`;
}

export function getTenantModelDefinitionToken(model: string) {
  return `${model}Definition`
}

export function getTenantId(headers: any): string{
  return headers['tenantId'];
}
