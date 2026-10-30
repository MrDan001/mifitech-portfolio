import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/','/proposal/']},sitemap:(process.env.NEXT_PUBLIC_SITE_URL||'https://mifitech-portfolio.vercel.app')+'/sitemap.xml'};}
