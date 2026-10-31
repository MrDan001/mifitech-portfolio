import type {MetadataRoute} from 'next';
import {getSeo} from '@/lib/backend';
export default async function robots():Promise<MetadataRoute.Robots>{const seo=await getSeo();return{rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/','/proposal/']},sitemap:String(seo.canonicalUrl).replace(/\/$/,'')+'/sitemap.xml'};}
