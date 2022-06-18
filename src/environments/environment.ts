// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { callbackUri, clientId, domain } from 'src/app/auth.config';
import * as config from '../../auth_config.json';

const { audience, errorPath } = config as {
  audience?: string;
  errorPath: string;
};

const API_URL = 'https://app-preguntados-mobile.herokuapp.com';

export const environment = {
  production: false,
  API_URL,
  OPEN_API_URL: 'https://opentdb.com',
  AUTH: {
    domain,
    clientId,
    audience: 'https://preguntados.back',
    redirectUri: callbackUri,
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${API_URL}/*`],
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
