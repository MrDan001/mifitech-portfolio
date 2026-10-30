import { isAdmin } from '@/lib/backend';
import AdminPanel from './panel';
import LoginForm from './login';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic='force-dynamic';
export default async function AdminPage() { return await isAdmin() ? <AdminPanel/> : <LoginForm/>; }
