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

    DO_SPACES_ENDPOINT_URL: str(),
    DO_SPACES_ACCESS_KEY_ID: str(),
    DO_SPACES_SECRET_ACCESS_KEY: str(),
    DO_SPACES_BUCKET_NAME: str(),
})