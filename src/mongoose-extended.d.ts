
declare module "mongoose" {
  interface Model<T extends Document> {
      softdelete(id: string | number, fn?: any): this;
  }

  interface Query<ResultType, DocType extends Document> {
    deepPopulate(arrayOfPath: string[], fn?: any): this;
   
  }
}
