import type {MetadataRoute} from 'next';
import {getSeo} from '@/lib/backend';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const seo=await getSeo();const root=String(seo.canonicalUrl).replace(/\/$/,'');return ['','/how-to-build-a-website-in-nigeria','/projects/ludo-live','/projects/ehealthcare','/projects/garrison-market','/projects/the-africa-plug'].map(p=>({url:root+p,changeFrequency:p===''?'weekly':'monthly',priority:p===''?1:p.startsWith('/how-to')?0.9:0.7}));}
