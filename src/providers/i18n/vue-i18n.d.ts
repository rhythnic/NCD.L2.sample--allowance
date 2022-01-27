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
    account: {
      amount: string;
      balance: string;
      id: string;
      idsToAdd: string;
      initialBalance: string;
      recipient: string;
      sameInitialBalance: string;
      subaccount: string;
    };

    actions: {
      add: string;
      cancel: string;
      confirm: string;
      create: string;
      delete: string;
      set: string;
      transfer: string;
      transferMoney: string;
    };

    app: {
      description: string;
      taglinePt1: string;
      taglinePt2: string;
      title: string;
      transactionSucceeded: string;
    };

    fund: {
      create: string;
      createFundPrompt: string;
      depositMoney: string;
      fund: string;
      loading: string;
      owner: string;
      setUnrestrictedBalance: string;
      unrestrictedBalance: string;
    };

    i18n: {
      language: string;
    };

    learn: {
      learn: string;
      learnToBuildNearDapps: string;
      madeForNcd: string;
      nearEduTeachesNear: string;
    };

    payee: {
      payee: string;
      add: string;
      remove: string;
      setBalance: string;
    };

    payer: {
      payer: string;
      add: string;
      remove: string;
      setBalance: string;
    };

    wallet: {
      signIn: string;
      signInSuccess: string;
      signOut: string;
      signInPrompt: string;
      supported: string;
    };
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
