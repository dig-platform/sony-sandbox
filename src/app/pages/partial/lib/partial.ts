// todo type this stricter
export type PartialLoader = () => any;

export interface PartialConfig {
  moduleName: string;
}
export interface PartialOptions {
  moduleName?: string;
}

export const partial = (loader: PartialLoader, props: any = {}, config: PartialOptions = {}): any => {
  const partialConfig = Object.assign({
    moduleName: 'PartialModule'
  }, config);
  return () => {
    const moduleName: string = partialConfig.moduleName;
    return loader().then((m: any) => {
      const module = m[moduleName];
      return module.partial;
    }).catch(console.error);
  }
}
