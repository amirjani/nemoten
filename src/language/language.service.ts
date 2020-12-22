import { Injectable } from '@nestjs/common';
import { InjectTenancyModel } from "../tenancy/decorator";
import { Language, LanguageDocument } from "./language.schema";
import { Model, Document } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

const testSessionHandler = (modelProp) => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  
  
  const originalMethod = descriptor.value;
  const str:string = descriptor.value.toString();
  const inputNames = str.substring(
    str.indexOf("(") + 1, 
    str.indexOf(")")
  ).split(",");
  console.log(descriptor.value.toString(),inputNames,inputNames.indexOf("tenantId"));
  
  descriptor.value = async function (...args: any) {
      const tenantId = args[inputNames.indexOf("tenantId")];
      // console.log(tenantId);
      const mainModel = this[modelProp].db.useDb(tenantId, {useCache: true}).model(this[modelProp].name, this[modelProp].schema);
      const result = await originalMethod.apply(this && {
        [modelProp]:mainModel
      }, args);
      return result;
  };
}

// Property Decorator
function Emoji(name:string) {
  
  
  return function(target: Object, key: string | symbol) {
    console.log(name);
    let val = target[key];
    console.log(val);
    
    const setDb = (name) =>  {
      console.log('setDb flavor...',name);
      val.tenant = name;
      console.log(val.schema);
      
      const conn = val.db.useDb(val.tenant, {useCache: true}).model(val.name, val.schema);
        // if(conn) {
        //   Object.assign(conn,{ setDb })
        // }
        // console.log(conn);
      return conn;
    };

    const getter = () =>  {

        console.log('get flavor...', val.tenant);        
        // const conn = val.db.useDb(val.tenant, {useCache: true}).model(val.name, val.schema);
        // if(conn) {
        //   Object.assign(conn,{ setDb })
        // }
        // console.log(conn);
        
        return val
    };
    const setter = (value) => {
        console.log('set flavor...');
        val = value;
        console.log(val);
        if(val) {
          Object.assign(val,{ setDb })
        }
    };

   
    
    Object.defineProperty(target, key, {
      get: getter,
      set: setter
    });


  };
}


@Injectable()
export class LanguageService {
  // @Emoji("tenantId")
  private languageModel: Model<LanguageDocument>;
  constructor(
    @InjectModel(Language.name) _languageModel: Model<LanguageDocument>
  ) {
    console.log("LanguageService Invoked!");
    this.languageModel = _languageModel;
  }

  
  @testSessionHandler("languageModel")
  async create(tenantId) {
    
    
    const language: Partial<Language> = {
      isoCode: {
        primary: 'fa',
        secondary: 'fas'
      },
      tenancy: tenantId,
      name: 'farsi',
      nativeName: 'فارسی'
    }
    return await this.languageModel.create(language as Language);
  }
}