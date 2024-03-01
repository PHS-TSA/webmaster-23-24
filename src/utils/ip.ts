/**
 * Vendored version of `https://deno.land/x/ip_location@v1.0.0`
 * @module
 */

import { z } from "zod";
import { regionSchema } from "./calc.ts";
import type { ZodTypeUnknown } from "./zod.ts";

type Geo = z.infer<typeof geoSchema>;
type Ip = z.infer<typeof ipSchema>;

const geoSchema = z.object({ region: regionSchema });
const ipSchema = z.object({ ip: z.string() });

const ipEndpoint = "https://api.ipify.org";
const geoEndpoint = "https://ipapi.co";

let serverIp: string | undefined;

/**
 * Get details about an IP from the <https://ipapi.co> API.
 */
export async function getIPLocation(ip?: string): Promise<Geo> {
  let currentIP: string | undefined;
  if (["127.0.0.1", undefined].includes(ip)) {
    if (serverIp === undefined) {
      serverIp = (await getIp()).ip;
    }
    currentIP = serverIp;
  } else {
    currentIP = ip;
  }

  return await makeRequest(`${geoEndpoint}/${currentIP}/json/`, geoSchema);
}

/**
 * Query a JSON API and validate the response.
 *
 * @param endpoint - The API to query (GET).
 * @param schema - The Zod schema to validate the data against.
 * @returns - The validated API content.
 */
export async function makeRequest<T extends ZodTypeUnknown>(
  endpoint: string,
  schema: T,
): Promise<z.infer<T>> {
  // Send the request.
  const json = await (await fetch(endpoint)).json();

  // Validate the response.
  return schema.parse(json);
}

/**
 * Get the current device's IP from the https://ipify.org API.
 */
export function getIp(): Promise<Ip> {
  // make http request and return the IP as json
  return makeRequest(`${ipEndpoint}?format=json`, ipSchema);
}
