import {PassedInitialConfig} from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GekDUPL2X',
    redirectUrl: environment.redirectUrl,
    postLogoutRedirectUri: environment.postLogoutRedirectUri,
    clientId: environment.clientId,
    scope: 'email openid phone',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
  }
};
