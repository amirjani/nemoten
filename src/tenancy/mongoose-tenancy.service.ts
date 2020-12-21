import { Inject, Injectable, Scope } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(
        @Inject(REQUEST) private readonly request: Request) {
            console.log("MongooseConfigService Invoked!");
            
    }

    createMongooseOptions(): MongooseModuleOptions {
        return {
            poolSize: 2,
            uri: 'mongodb://localhost:27017/Fabizi_1', // Change this to whatever you want; you have full access to the request object.
        };
    }
}