import { registerAs } from '@nestjs/config';

export default registerAs('clients', () => ({
  companyManager: process.env.COMPANY_MANAGER_URL,
}));
