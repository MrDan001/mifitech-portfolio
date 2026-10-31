import { NextResponse } from 'next/server';
import { db } from '@/lib/backend';
export async function POST(req:Request) {
 const b=await req.json().catch(()=>null); if(!b) return NextResponse.json({error:'Invalid enquiry.'},{status:400});
 if(b.website) return NextResponse.json({ok:true});
 const name=String(b.name||'').trim(), email=String(b.email||'').trim(), details=String(b.project_details||'').trim();
 if(!name||!/^\S+@\S+\.\S+$/.test(email)||!details) return NextResponse.json({error:'Name, valid email and project details are required.'},{status:400});
 try { await db('leads',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({name:name.slice(0,120),email:email.slice(0,200),business:String(b.business||'').slice(0,160),project_type:String(b.project_type||'Not sure yet').slice(0,100),details:details.slice(0,5000),source_url:String(b.source_url||'').slice(0,1000),demo:String(b.demo||'').slice(0,100),status:'new'})}); return NextResponse.json({ok:true}); }
 catch(e) { return NextResponse.json({error:e instanceof Error?e.message:'Could not save enquiry.'},{status:503}); }
}
