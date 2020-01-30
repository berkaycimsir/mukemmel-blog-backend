// typescript type for graphql resolvers
export type Resolver = (
  parent: any,
  args: any,
  context: any,
  info: any
) => Promise<any> | any;

// typescript interface for graphql queries
export interface IQueryType {
  [key: string]: Resolver;
}

// typescript interface for graphql mutations
export interface IMutationType {
  [key: string]: Resolver;
}

// typescript interface for graphql resolvers
export interface IResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
