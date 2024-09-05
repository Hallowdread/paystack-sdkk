import type { Country } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";
import type { GetBanksOptions } from "../types/clients/miscellaneous.ts";
import { PaystackResponse } from "../types/global.ts";

/**
 * MiscellaneousClient provides methods that lets you interface with Paystack's
 * Miscellaneous API are supporting APIs that can be used to provide more
 * details to other APIs. https://paystack.com/docs/api/miscellaneous/
 */
export default class MiscellaneousClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a MiscellaneousClient
   *
   * @param secretKey - Your paystack integration secret key.
   * @param client - A custom rest client to use for making api calls to paystack's instead
   * of creating a new one with the secretKey
   */
  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  /**
   * Get a list of all supported banks and their properties
   *
   * @param options : {@link GetBanksOptions} let's you customize the data in the
   * response to be returned. the country property is required to retrieve banks
   * in that country supported by Paystack
   * @returns A promise containing a {@link PaystackResponse}
   */
  getBanks(options: GetBanksOptions): Promise<PaystackResponse> {
    return this.client.call("/bank", HTTPMethod.GET, null, options);
  }

  /**
   * Gets a list of Countries that Paystack currently supports
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  getCountries(): Promise<PaystackResponse> {
    return this.client.call("/country", HTTPMethod.GET);
  }

  /**
   * Get a list of states for a country for address verification.
   *
   * @param country :  The country from which to filter the states
   * @returns A promise containing a {@link PaystackResponse}
   */
  getStates(country: Country): Promise<PaystackResponse> {
    return this.client.call(
      `address_verification/states?country=${country}`,
      HTTPMethod.GET,
    );
  }
}
