function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export const credentials = {
  username: requireEnv('HRMS_USERNAME'),
  password: requireEnv('HRMS_PASSWORD')
};

export const baseURL = process.env.BASE_URL || 'http://localhost:3015';
