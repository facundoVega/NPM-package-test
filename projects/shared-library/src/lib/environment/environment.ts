import { BrowserCacheLocation, Configuration, LogLevel } from "@azure/msal-browser"

  
  
  
  const B2C_LOGIN = 'tpsdevb2c.b2clogin.com'
  const B2C_URL   = 'tpsdevb2c.onmicrosoft.com'
  const authoritySignIn = 'B2C_1A_USERNAME_SUSI'
  const authorityEditProfile = 'B2C_1A_PROFILEEDIT'
  const authorityChangePassword = 'B2C_1A_PROFILE_EDIT_PASSWORD_CHANGE'

  
  export const b2cPolicies = {
    redirectUrl: 'http://localhost:4200/my-account/edit/',
    names: {
      signUpSignIn: authoritySignIn,
      editProfile: authorityEditProfile,
      changePassword: authorityChangePassword,
    },
    authorities: {
      signUpSignIn: {
        authority:
          `https://${B2C_LOGIN}/${B2C_URL}/${authoritySignIn}`,
      },
      editProfile: {
        authority:
          `https://${B2C_LOGIN}/${B2C_URL}/${authorityEditProfile}`,
      },
      changePassword: {
        authority:
          `https://${B2C_LOGIN}/${B2C_URL}/oauth2/v2.0/authorize?p=${authorityChangePassword}`,
      },
    },
    authorityDomain: B2C_LOGIN,
  };
  
  const isIE =
    window.navigator.userAgent.indexOf('MSIE ') > -1 ||
    window.navigator.userAgent.indexOf('Trident/') > -1;
  
  export const msalConfig: Configuration = {
    auth: {
      clientId: '', // mandatory field
      authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
      knownAuthorities: [b2cPolicies.authorityDomain],
      redirectUri: window.location.origin, // Register this URI on Azure portal.
      postLogoutRedirectUri: '/', // page to navigate after logout.
      navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" or "localStorage"
      storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback(logLevel: LogLevel, message: string) {
          console.log(message);
          window.location.href = '/';
        },
        logLevel: LogLevel.Error,
        piiLoggingEnabled: false,
      },
    },
  };
  
  export const environment = {
    // scopes
    scopes: [
      `https://${B2C_URL}/scopes/ClientExperienceReadWrite`,
      `https://${B2C_URL}/scopes/PatientEngagementReadWrite`,
      `https://${B2C_URL}/scopes/ClaimsManagementReadWrite`,
    ]
  };