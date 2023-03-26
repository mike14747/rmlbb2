declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            MONGODB_URI: string;
            MONGODB_DB: string;
            SANITY_PUBLIC_QUERY_URL: string;
            SANITY_PUBLIC_MUTATION_URL: string;
            SANITY_PUBLIC_API_TOKEN: string;
            SANITY_PRIVATE_QUERY_URL: string;
            SANITY_API_TOKEN: string;
            SANITY_PRIVATE_MUTATION_URL: string;
            SANITY_PRIVATE_API_TOKEN: string;
            NEXT_PUBLIC_BASE_FILE_QUERY_URL: string;
            NEXT_PUBLIC_BASE_FILE_DOWNLOAD_URL: string;
            NEXTAUTH_URL: string;
            NEXTAUTH_SECRET: string;
            NO_REPLY_EMAIL: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_REFRESH_TOKEN: string;
            BASE_URL: string;
        }
    }
}

export { };
