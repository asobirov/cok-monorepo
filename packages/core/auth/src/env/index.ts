import { str, envsafe } from 'envsafe';

export const env = envsafe({
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'test', 'production'],
  }),
  GITHUB_CLIENT_ID: str({
    desc: 'GitHub OAuth App Client ID',
    devDefault: ''
  }),
  GITHUB_CLIENT_SECRET: str({
    desc: 'GitHub OAuth App Client Secret',
    devDefault: ''
  }),
});