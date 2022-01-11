/**
 * global type definitions
 * using the typescript interface, you can define the i18n resources that is type-safed!
 */

/**
 * you need to import the some interfaces
 */
import {
  DefineLocaleMessage,
  DefineDateTimeFormat,
  DefineNumberFormat,
} from "vue-i18n";

declare module "vue-i18n" {
  // define the locale messages schema
  export interface DefineLocaleMessage {
    actions: {
      cancel: string;
      create: string;
    };
    fund: {
      funds: string;
      create: string;
      subaccount: string;
      noFundsPrompt: string;
    };
    wallet: {
      signIn: string;
      signOut: string;
      signInPrompt: string;
    };
    nav: {
      settings: string;
      learn: string;
    };
    i18n: {
      language: string;
    };
    // errors: string[];
  }

  // define the datetime format schema
  export interface DefineDateTimeFormat {
    short: {
      hour: "numeric";
      minute: "numeric";
      second: "numeric";
      timeZoneName: "short";
      timezone: string;
    };
  }

  // define the number format schema
  export interface DefineNumberFormat {
    currency: {
      style: "currency";
      currencyDisplay: "symbol";
      currency: string;
    };
  }
}
