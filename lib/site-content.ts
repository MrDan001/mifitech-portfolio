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
      demos: Array.isArray(saved.demos) ? saved.demos.map((demo) => ({ ...defaultSiteContent.demos.find((item) => item.slug === demo.slug), ...demo })) : defaultSiteContent.demos,
      projects: Array.isArray(saved.projects) ? saved.projects.map((project) => {
        const fallback = defaultSiteContent.projects.find((item) => item.slug === project.slug);
        const caseStudy = project.caseStudy || fallback?.caseStudy;
        const legacyPreviewPath = '/previews/' + project.slug + '.svg';
        const image = project.image === legacyPreviewPath || !project.image ? (fallback?.image || project.image) : project.image;
        return { ...fallback, ...project, image, ...(caseStudy ? { caseStudy: { ...(fallback?.caseStudy || {}), ...(project.caseStudy || {}), gallery: Array.isArray(project.caseStudy?.gallery) ? project.caseStudy.gallery : (fallback?.caseStudy?.gallery || []) } } : {}) };
      }) : defaultSiteContent.projects,
      guideArticle: { ...defaultSiteContent.guideArticle, ...(saved.guideArticle || {}) },
      studioProfile: { ...defaultSiteContent.studioProfile, ...(saved.studioProfile || {}), highlights: Array.isArray(saved.studioProfile?.highlights) ? saved.studioProfile.highlights : defaultSiteContent.studioProfile.highlights },
      guideSections: Array.isArray(saved.guideSections) ? saved.guideSections : defaultSiteContent.guideSections,
      trustPoints: Array.isArray(saved.trustPoints) ? saved.trustPoints : defaultSiteContent.trustPoints,
      faqs: Array.isArray(saved.faqs) ? saved.faqs : defaultSiteContent.faqs,
      testimonials: Array.isArray(saved.testimonials) ? saved.testimonials : defaultSiteContent.testimonials,
      stages: Array.isArray(saved.stages) ? saved.stages : defaultSiteContent.stages,
    };
    return content;
  } catch {
    return defaultSiteContent;
  }
}
