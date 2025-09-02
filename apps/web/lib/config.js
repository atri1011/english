import { z } from 'zod';
const envSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, 'Supabase URL is required'),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anonymous key is required'),
});
const env = envSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
});
export const config = {
    supabase: {
        url: env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
};
