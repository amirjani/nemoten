import { Inject } from "@nestjs/common";
import { getTenantConnectionToken, getTenantModelToken } from "../util/tenancy.util";

export const InjectTenancyModel = (model: string) => Inject(getTenantModelToken(model));

export const InjectTenancyConnection = (name?: string) => Inject(getTenantConnectionToken(name));