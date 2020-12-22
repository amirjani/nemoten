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
  descriptor.value = async function (...args: any) {
      console.log(modelProp);
      const mainModel = this[modelProp].db.useDb(args[0], {useCache: true}).model(this[modelProp].name, this[modelProp].schema);
      const result = await originalMethod.apply({
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
  @Emoji("tenantId")
  private languageModel: Model<LanguageDocument>;
  constructor(
    @InjectModel(Language.name) _languageModel: Model<LanguageDocument>
  ) {
    console.log("LanguageService Invoked!");
    this.languageModel = _languageModel;
  }

  GetTenancyModel<T extends Document> (model: Model<T>, dbname: string) : Model<T> {
    return model.db.useDb(dbname, {useCache: true}).model(model.name, model.schema);
  }
  // @testSessionHandler("languageModel")
  async create() {

    const dbs = ['Fabizi_22004', 'Fabizi_22005', 'Fabizi_22006','Fabizi_22007' ,'Fabizi_22008', 'Fabizi_22009', 'Fabizi_22010'];
    const random = Math.floor(Math.random() * dbs.length);
    const dbName = dbs[random];
    const language: Partial<Language> = {
      isoCode: {
        primary: 'fa',
        secondary: 'fas'
      },
      tenancy: dbName,
      name: 'farsi',
      nativeName: 'فارسی'
    }
    // console.log(this.languageModel);
    // console.log("LANGUAGE CREATED");
    // const model = (this.languageModel as any ).setDb("salam")
    
    return await (this.languageModel as any).setDb(dbName).create(language as Language);
  }
}