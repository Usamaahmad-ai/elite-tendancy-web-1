import { supabase } from './supabaseClient';

export type InquiryPayload = {
  first_name: string;
  last_name: string;
  email: string;
  interest: string;
  message: string;
  source_page: string;
};

export async function submitInquiry(payload: InquiryPayload) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { error } = await supabase.from('contact_inquiries').insert([
    {
      ...payload,
      full_name: `${payload.first_name} ${payload.last_name}`.trim(),
      created_at: new Date().toISOString()
    }
  ]);

  if (error) throw error;
}
