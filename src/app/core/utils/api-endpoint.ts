import { environment } from "src/environments/environment"

const prefixURL = environment.BASEAPIURL;
export const ApiEndpoint = {
  authEndpoint: {
      login :  `${prefixURL}/auth/login`,
      forgetPassword : `${prefixURL}/auth/forget-password`,
      resetPassword : `${prefixURL}/auth/reset-password`,
  }
}
