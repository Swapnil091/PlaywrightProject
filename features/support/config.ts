import "dotenv/config";

export function getBaseUrl(): string {
  const baseUrl = process.env.STOCKMASTER_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error("Set STOCKMASTER_BASE_URL to the StockMaster login URL.");
  }

  try {
    return new URL(baseUrl).toString();
  } catch {
    throw new Error("STOCKMASTER_BASE_URL must be a valid absolute URL.");
  }
}

export function getAppUrl(path: string): string {
  return new URL(path, getBaseUrl()).toString();
}

export function getRequiredCredential(name: "STOCKMASTER_ADMIN_EMAIL" | "STOCKMASTER_ADMIN_PASSWORD"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Set ${name} to run credential-dependent scenarios.`);
  }

  return value;
}