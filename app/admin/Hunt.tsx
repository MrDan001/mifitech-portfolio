'use client';

import { useEffect, useMemo, useState } from 'react';
import { Empty, Icon } from './ui';

type Prospect = {
  id: string; name: string; address: string; country: string; city: string; industry: string;
  phone: string; email: string; description: string; mapsUrl: string; websiteStatus: string;
  subject: string; draft: string; status: string; batchId: string; createdAt: string;
};

const industries = ['Restaurants','Hotels','Beauty salons','Fashion boutiques','Construction companies','Real estate agencies','Clinics','Schools','Logistics companies','Professional services','Retail shops','Auto workshops','Event businesses','Other'];
const countries = ['Nigeria','United Kingdom','United States','Canada','Ireland','Australia','South Africa','Ghana','Kenya','United Arab Emirates','Germany','France','Netherlands','India','Other'];

export default function Hunt() {
  const [country,setCountry]=useState('Nigeria');
  const [city,setCity]=useState('');
  const [industry,setIndustry]=useState('Restaurants');
  const [customIndustry,setCustomIndustry]=useState('');
  const [prospects,setProspects]=useState<Prospect[]>([]);
  const [loading,setLoading]=useState(false);
  const [sending,setSending]=useState<string|null>(null);
  const [message,setMessage]=useState('');
  const [history,setHistory]=useState<Prospect[]>([]);
  const [activeBatch,setActiveBatch]=useState('');
  const [drafts,setDrafts]=useState<Record<string,{email:string;subject:string;draft:string}>>({});
  const [expanded,setExpanded]=useState<string|null>(null);

  async function loadHistory(){
    const r=await fetch('/api/admin/hunt/prospects'); const d=await r.json();
    if(r.ok){setHistory(d.prospects||[]);setProspects(d.prospects||[]);}
  }
  useEffect(()=>{loadHistory().catch(()=>setMessage('Could not load HUNT history.'));},[]);

  const current = useMemo(()=>prospects.filter(p=>!activeBatch||p.batchId===activeBatch),[prospects,activeBatch]);
  const completed = current.length>0 && current.every(p=>['sent','whatsapp_sent','skipped'].includes(p.status));
  const stats = useMemo(()=>({sent:history.filter(p=>p.status==='sent').length,contacted:history.filter(p=>['sent','whatsapp_sent'].includes(p.status)).length,available:current.length}),[history,current]);

  async function findBatch(){
    setLoading(true);setMessage('');
    try{
      const r=await fetch('/api/admin/hunt/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({country,city,industry:industry==='Other'?customIndustry:industry,limit:15})});
      const d=await r.json();
      if(!r.ok)throw new Error(d.error||'HUNT could not find businesses.');
      if(!d.prospects?.length){setMessage(d.message||'No new qualifying businesses were found. Try another city or industry.');return;}
      setProspects(d.prospects);setActiveBatch(d.batchId);setDrafts(Object.fromEntries(d.prospects.map((p:Prospect)=>[p.id,{email:p.email||'',subject:p.subject||'',draft:p.draft||''}])));
      setMessage('Found '+d.prospects.length+' new prospects. Review each contact before reaching out.');
      await loadHistory();
    }catch(e){setMessage(e instanceof Error?e.message:'Search failed.');}
    finally{setLoading(false);}
  }

  async function saveContact(p:Prospect){
    const draft=drafts[p.id]||{email:p.email,subject:p.subject,draft:p.draft};
    const r=await fetch('/api/admin/hunt/prospects',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:p.id,...draft})});
    const d=await r.json();if(!r.ok){setMessage(d.error||'Could not save contact details.');return false;}
    setProspects(old=>old.map(x=>x.id===p.id?{...x,...draft}:x));setMessage('Contact details saved.');return true;
  }

  async function sendEmail(p:Prospect){
    const draft=drafts[p.id]||{email:p.email,subject:p.subject,draft:p.draft};
    if(!draft.email.trim()){setMessage('Add and save a verified public email address first.');return;}
    if(!window.confirm('Send this personalised email to '+draft.email+'?'))return;
    setSending(p.id);setMessage('');
    try{
      const r=await fetch('/api/admin/hunt/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:p.id,...draft})});
      const d=await r.json();if(!r.ok)throw new Error(d.error||'Email could not be sent.');
      setMessage('Email accepted by Resend for '+draft.email+'.');await loadHistory();
    }catch(e){setMessage(e instanceof Error?e.message:'Email sending failed.');}
    finally{setSending(null);}
  }

  async function markWhatsApp(p:Prospect){
    const r=await fetch('/api/admin/hunt/prospects',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:p.id,status:'whatsapp_sent'})});
    const d=await r.json();if(!r.ok){setMessage(d.error||'Could not update status.');return;}
    await loadHistory();setMessage('Marked as contacted on WhatsApp.');
  }

  async function skip(p:Prospect){
    const r=await fetch('/api/admin/hunt/prospects',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:p.id,status:'skipped'})});
    const d=await r.json();if(!r.ok){setMessage(d.error||'Could not skip prospect.');return;}
    await loadHistory();
  }

  function waLink(p:Prospect){
    const phone=p.phone.replace(/\D/g,'').replace(/^00/,'');
    const text='Hello '+p.name+' team, I came across your business while researching '+p.industry.toLowerCase()+' businesses in '+p.city+'. I could not find a dedicated website linked to your public listing, so I wanted to introduce MifiTech. A clear website could help customers understand your services, see what you offer and contact you more easily. Would you be open to a quick, no-obligation conversation?';
    return phone?'https://wa.me/'+phone+'?text='+encodeURIComponent(text):'';
  }

  return <div className="ad-stack">
    <section className="ad-card">
      <div className="ad-card-head"><div><h2>Find businesses worth approaching</h2><p className="ad-sub">Search globally. HUNT checks public business listings and filters out listings that already show a website.</p></div><span className="ad-pill">15 per batch</span></div>
      <div className="ad-grid2">
        <label className="ad-field"><span>Country</span><select value={country} onChange={e=>setCountry(e.target.value)}>{countries.map(c=><option key={c}>{c}</option>)}</select></label>
        <label className="ad-field"><span>City or region <small>Optional</small></span><input value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. Lagos, Dublin, Toronto"/></label>
        <label className="ad-field"><span>Business category</span><select value={industry} onChange={e=>setIndustry(e.target.value)}>{industries.map(x=><option key={x}>{x}</option>)}</select></label>
        {industry==='Other'&&<label className="ad-field"><span>Describe the industry</span><input value={customIndustry} onChange={e=>setCustomIndustry(e.target.value)} placeholder="e.g. accounting firms"/></label>}
      </div>
      <div className="ad-row" style={{marginTop:16}}>
        <button className="ad-btn lime" onClick={findBatch} disabled={loading||!country||(industry==='Other'&&!customIndustry.trim())}><Icon n="search"/>{loading?'Searching public listings…':'Find 15 businesses'}</button>
        <span className="ad-hint">No emails are sent during discovery.</span>
      </div>
      {message&&<p className="ad-sub" role="status" style={{marginTop:12}}>{message}</p>}
    </section>
    <div className="ad-kpis">
      <div className="ad-kpi"><b>{stats.available}</b><span>In this batch</span></div>
      <div className="ad-kpi"><b>{stats.contacted}</b><span>Contacted overall</span></div>
      <div className="ad-kpi"><b>{stats.sent}</b><span>Emails sent</span></div>
      <div className="ad-kpi"><b>{history.length}</b><span>Saved prospects</span></div>
    </div>
    <div className="ad-row ad-between"><div><h2>Prospect list</h2><p className="ad-sub">Check the evidence, add a verified email if available, then send individually.</p></div>{completed&&<button className="ad-btn lime" onClick={findBatch} disabled={loading}>{loading?'Finding…':'Load next 15'}</button>}</div>
    {current.length?current.map(p=>{
      const d=drafts[p.id]||{email:p.email||'',subject:p.subject||'',draft:p.draft||''};
      const open=expanded===p.id;
      return <article className="ad-item" key={p.id}>
        <button className="ad-item-head" aria-expanded={open} onClick={()=>setExpanded(open?null:p.id)}>
          <i className="ad-av">{p.name.slice(0,1).toUpperCase()}</i><span className="grow"><b>{p.name}</b><small>{p.industry} · {p.city}, {p.country} · {p.address}</small></span>
          <span className={'ad-badge '+(p.status==='sent'?'sent':p.status==='whatsapp_sent'?'converted':'new')}>{p.status.replace('_',' ')}</span><span className="ad-chev"><Icon n="chev"/></span>
        </button>
        {open&&<div className="ad-item-body">
          <p>{p.description||'Business listing found in public search results.'}</p>
          <p className="ad-sub">Website check: <b>{p.websiteStatus==='not_found'?'No website linked on the Google Business listing (not proof that none exists).':'Needs manual verification'}</b></p>
          <div className="ad-row">
            {p.phone?<span className="ad-sub">Phone: <a href={'tel:'+p.phone}>{p.phone}</a></span>:<span className="ad-sub">No public phone number found</span>}
            {p.mapsUrl&&<a className="ad-btn ghost sm" href={p.mapsUrl} target="_blank" rel="noreferrer"><Icon n="map"/>Open listing</a>}
          </div>
          <label className="ad-field"><span>Public email address <small>Verify before sending</small></span><input type="email" value={d.email} onChange={e=>setDrafts(old=>({...old,[p.id]:{...d,email:e.target.value}}))} placeholder="Add a verified business email"/></label>
          <label className="ad-field"><span>Email subject</span><input value={d.subject} onChange={e=>setDrafts(old=>({...old,[p.id]:{...d,subject:e.target.value}}))}/></label>
          <label className="ad-field"><span>Personalised email</span><textarea rows={8} value={d.draft} onChange={e=>setDrafts(old=>({...old,[p.id]:{...d,draft:e.target.value}}))}/></label>
          <div className="ad-row">
            <button className="ad-btn ghost sm" onClick={()=>saveContact(p)}><Icon n="check"/>Save edits</button>
            <button className="ad-btn lime sm" disabled={sending===p.id||p.status==='sent'} onClick={()=>sendEmail(p)}><Icon n="mail"/>{sending===p.id?'Sending…':'Send email'}</button>
            {waLink(p)&&<a className="ad-btn sm" href={waLink(p)} target="_blank" rel="noreferrer" onClick={()=>setTimeout(()=>markWhatsApp(p),1500)}><Icon n="message"/>Open WhatsApp</a>}
            {p.status==='new'&&<button className="ad-btn ghost sm" onClick={()=>skip(p)}>Skip prospect</button>}
          </div>
        </div>}
      </article>;
    }):<Empty title="Your next prospects will appear here" text="Choose a country and business category, then run a search. HUNT will keep a history so the same listing is not added twice."/>}
    {history.length>current.length&&<details className="ad-card"><summary><b>Campaign history ({history.length})</b></summary><div className="ad-list" style={{marginTop:12}}>{history.slice(0,50).map(p=><div className="ad-li" key={p.id}><span className="grow"><b>{p.name}</b><small>{p.city}, {p.country} · {p.status}</small></span><small>{new Date(p.createdAt).toLocaleDateString()}</small></div>)}</div></details>}
    <p className="ad-hint">HUNT only prepares a WhatsApp message. WhatsApp opens with the text filled in; you must review and press Send yourself. Email is always sent one business at a time after confirmation.</p>
  </div>;
}
