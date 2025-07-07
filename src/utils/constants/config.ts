export const ENV_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL as string,
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
  SIGN_IN_URL: process.env.NEXT_PUBLIC_SIGN_IN_URL as string,
  SIGN_UP_URL: process.env.NEXT_PUBLIC_SIGN_UP_URL as string,
  AUTH_REDIRECT_URL: process.env
    .NEXT_PUBLIC_AUTH_REDIRECT_URL as string,
  SESSION_KEY: process.env.NEXT_PUBLIC_SESSION_KEY as string,
}
