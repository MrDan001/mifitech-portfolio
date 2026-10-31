import { db } from '@/lib/backend';
import { defaultSiteContent, type SiteContent } from './site-content-defaults';

export { defaultSiteContent };
export type { NavigationItem, ServiceItem, DemoItem, ProjectItem, StageItem, SiteContent } from './site-content-defaults';

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const rows = await db<Array<{ value: Partial<SiteContent> }>>('site_settings?key=eq.content&select=value&limit=1');
    const saved = rows[0]?.value;
    if (!saved || typeof saved !== 'object') return defaultSiteContent;

    const savedSections: Partial<SiteContent['sections']> = saved.sections || {};
    const content: SiteContent = {
      ...defaultSiteContent,
      ...saved,
      hero: { ...defaultSiteContent.hero, ...(saved.hero || {}) },
      sections: {
        services: { ...defaultSiteContent.sections.services, ...(savedSections.services || {}) },
        demos: { ...defaultSiteContent.sections.demos, ...(savedSections.demos || {}) },
        work: { ...defaultSiteContent.sections.work, ...(savedSections.work || {}) },
        about: { ...defaultSiteContent.sections.about, ...(savedSections.about || {}) },
        process: { ...defaultSiteContent.sections.process, ...(savedSections.process || {}) },
        guide: { ...defaultSiteContent.sections.guide, ...(savedSections.guide || {}) },
        contact: { ...defaultSiteContent.sections.contact, ...(savedSections.contact || {}) },
      },
      footer: { ...defaultSiteContent.footer, ...(saved.footer || {}) },
      navigation: Array.isArray(saved.navigation) ? saved.navigation : defaultSiteContent.navigation,
      services: Array.isArray(saved.services) ? saved.services : defaultSiteContent.services,
      demos: Array.isArray(saved.demos) ? saved.demos : defaultSiteContent.demos,
      projects: Array.isArray(saved.projects) ? saved.projects : defaultSiteContent.projects,
      stages: Array.isArray(saved.stages) ? saved.stages : defaultSiteContent.stages,
    };
    return content;
  } catch {
    return defaultSiteContent;
  }
}
