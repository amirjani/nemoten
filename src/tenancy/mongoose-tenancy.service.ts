import { Inject, Injectable, Scope } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(
        @Inject(REQUEST) private readonly request: Request) {
            console.log("MongooseCongifService Invoked!");
            
    }

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: 'mongodb://localhost:27017/Fabizi_' + this.request.query["tenantId"] as string, // Change this to whatever you want; you have full access to the request object.
        };
    }
}