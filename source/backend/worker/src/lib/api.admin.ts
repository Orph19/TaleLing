
import {EnvironmentVariablesAdmin} from '../utils/types';


/**
 * 
 * @param envAdmin The environtment variables to comunicate with the admin 
 * @param endpoint The endpoint to comunicate e.g. '/user', '/story/create'
 * @param data The object that is intended to send
 */
export async function comunicateApiAdmin(
  envAdmin: EnvironmentVariablesAdmin,
  endpoint: string,
  data: object
): Promise<{ status: number; data: any; error: string | null }> {
  try {
    const response = await fetch(`${envAdmin.apiUrl}/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-API-Key': envAdmin.internalSecret,
      },
      body: JSON.stringify(data),
    });

    let body: any = null;
    try {
      const text = await response.text();
      body = text ? JSON.parse(text) : null;
    } catch {
      body = null;
    }

    const errorMsg =
      !response.ok
        ? (body && (body.error || body.message)) ||
          `Admin server responded with ${response.status}`
        : null;

    return {
      status: response.status,
      data: body,
      error: errorMsg,
    };
  } catch (err: any) {
    // Network or unexpected failure
    return {
      status: 0,
      data: null,
      error: err?.message || 'Unknown network error',
    };
  }
}
