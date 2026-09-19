interface Config {
  api: string;
}

let config: Config | null = null;

export async function loadConfig() {
  const response = await fetch('/config.json');

  if (!response.ok) {
    throw new Error(
      `Failed to load config: ${response.status} ${response.statusText}`,
    );
  }
  config = (await response.json()) as Config;
}

export function getConfig(): Config {
  if (!config) {
    throw new Error('Config not loaded.');
  }
  return config;
}
