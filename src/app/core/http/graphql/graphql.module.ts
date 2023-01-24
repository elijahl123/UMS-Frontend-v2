import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const uri = environment.graphqlUrl; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri: uri });
  const middleware = new ApolloLink((operation, forward) => {
    if (localStorage.getItem('token')) {
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      });
    }
    return forward(operation);
  });

  const link = middleware.concat(http);

  return {
    link,
    cache: new InMemoryCache({
      dataIdFromObject: (object: any) => object.uid || null
    }),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
