import { envsafe, str, } from 'envsafe';

export const env = envsafe({
    NODE_ENV: str({
        choices: ["development", "test", "production"],
    }),

    VERCEL_URL: str({
        default: '',
        allowEmpty: true,
    }),
    NEXTAUTH_URL: str({
        default: '',
        allowEmpty: true,
    }),

    GITHUB_CLIENT_ID: str(),
    GITHUB_CLIENT_SECRET: str(),

    NEXTAUTH_SECRET: str(),
})