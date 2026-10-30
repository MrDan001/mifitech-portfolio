import { db } from '@/lib/backend';
import { defaultHomepageContent, defaultBusinessSettings, type HomepageContent, type BusinessSettings } from './site-content-defaults';
export { defaultHomepageContent, defaultBusinessSettings } from './site-content-defaults';
export type { HomepageContent, BusinessSettings } from './site-content-defaults';

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const rows = await db<Array<{ value: Partial<HomepageContent> }>>('site_settings?key=eq.homepage&select=value&limit=1');
    const saved = rows[0]?.value;
    if (!saved) return defaultHomepageContent;
    return {
      ...defaultHomepageContent, ...saved,
      hero: { ...defaultHomepageContent.hero, ...(saved.hero || {}) },
      sections: { ...defaultHomepageContent.sections, ...(saved.sections || {}) },
      contact: { ...defaultHomepageContent.contact, ...(saved.contact || {}) },
      services: Array.isArray(saved.services) ? saved.services : defaultHomepageContent.services,
      demos: Array.isArray(saved.demos) ? saved.demos : defaultHomepageContent.demos,
      projects: Array.isArray(saved.projects) ? saved.projects : defaultHomepageContent.projects,
      stages: Array.isArray(saved.stages) ? saved.stages : defaultHomepageContent.stages,
    };
  } catch { return defaultHomepageContent; }
}

export type BusinessSettings = { businessName: string; contactEmail: string; phone: string; location: string; tagline: string };
export const defaultBusinessSettings: BusinessSettings = {
  businessName:'MifiTech', contactEmail:'officialsafebase@gmail.com', phone:'', location:'Nigeria', tagline:'Thoughtful websites. Useful digital products.',
};
export async function getBusinessSettings(): Promise<BusinessSettings> {
  try {
    const rows = await db<Array<{ value: Partial<BusinessSettings> }>>('site_settings?key=eq.business&select=value&limit=1');
    return { ...defaultBusinessSettings, ...(rows[0]?.value || {}) };
  } catch { return defaultBusinessSettings; }
}
