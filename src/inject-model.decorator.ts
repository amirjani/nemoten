export const InjectModelDecorator = () => (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const oldDescriptor = descriptor.value;
   
    descriptor.value = async function (...params: any) {
        Object.keys(this).forEach(key => { 
            if (this[key].schema) {
                this[key].db.useDb(params[0], {useCache: true}).model(this[key].name, this[key].schema)
            }
        });
        return oldDescriptor.apply(this, params);
    }
}