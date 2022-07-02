export type JWTClaims = {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string | string[];
  sub: string;
  typ: string;
  azp: string;
  acr: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    companymanager: {
      roles: string[];
    };
    account: {
      roles: string[];
    };
  };
  scope: string;
  clientId: string;
  email_verified: boolean;
  clientHost: string;
  preferred_username: string;
  clientAddress: string;
};

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  DEBUG = 'debug',
}
