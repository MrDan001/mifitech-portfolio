import { db } from '@/lib/backend';

export type TestimonialRecord = {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  quote: string;
  rating: number;
  status: 'pending' | 'approved' | 'archived';
  displayed: boolean;
  consent: boolean;
  createdAt: string;
  updatedAt?: string;
};

export async function getTestimonials(): Promise<TestimonialRecord[]> {
  const rows = await db<Array<{ value: unknown }>>('site_settings?key=eq.testimonials&select=value&limit=1');
  const value = rows[0]?.value;
  return Array.isArray(value) ? value as TestimonialRecord[] : [];
}

export async function getPublicTestimonials(): Promise<TestimonialRecord[]> {
  try {
    return (await getTestimonials())
      .filter((item) => item.status === 'approved' && item.displayed === true)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  } catch {
    return [];
  }
}

export async function saveTestimonials(items: TestimonialRecord[]) {
  await db('site_settings?on_conflict=key', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ key: 'testimonials', value: items, updated_at: new Date().toISOString() }),
  });
}
