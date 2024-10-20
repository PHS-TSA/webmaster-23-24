/**
 * Vendored version of `https://deno.land/x/ip_location@v1.0.0`
 * @module
 */

import { Schema } from "@effect/schema";
import { join } from "@std/path";
import { RegionSchema } from "./calc/solar.ts";

export type Geo = typeof GeoSchema.Type;
type Ip = typeof IpSchema.Type;

export const GeoSchema = Schema.Struct({ region: RegionSchema });
const IpSchema = Schema.Struct({ ip: Schema.String });

const ipEndpoint = "https://api.ipify.org";
const geoEndpoint = "https://ipapi.co";

let serverIp: string | undefined;

/**
 * Get details about an IP from the <https://ipapi.co> API.
 */
export async function getIpLocation(ip?: string): Promise<Geo | undefined> {
  try {
    let currentIP: string | undefined;
    if (["127.0.0.1", undefined].includes(ip)) {
      if (serverIp === undefined) {
        serverIp = (await getIp()).ip;
      }
      currentIP = serverIp;
    } else {
      currentIP = ip;
    }

    return await makeRequest<typeof GeoSchema>(
      join(geoEndpoint, currentIP ?? "", "json"),
      GeoSchema,
    );
  } catch {
    return undefined;
  }
}

/**
 * Query a JSON API and validate the response.
 *
 * @param endpoint - The API to query (GET).
 * @param schema - The schema to validate the data against.
 * @returns - The validated API content.
 */
async function makeRequest<
  T extends Schema.Schema<A>,
  A = Schema.Schema.Type<T>,
>(endpoint: string, schema: T): Promise<A> {
  // Send the request.
  const res = await fetch(endpoint);

  // Validate the response.
  return Schema.decodeUnknownSync(schema)(await res.json());
}

/**
 * Get the current device's IP from the https://ipify.org API.
 */
function getIp(): Promise<Ip> {
  // make http request and return the IP as json
  return makeRequest(`${ipEndpoint}?format=json`, IpSchema);
}
