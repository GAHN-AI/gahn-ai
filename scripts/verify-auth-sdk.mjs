// Exercise installed Supabase SDK cookie/PKCE behavior against an in-process
// fake Auth transport. This does not test Google's service or email delivery.
import assert from 'node:assert/strict';
import {createBrowserClient,createServerClient} from '@supabase/ssr';
const jar=new Map();
let recovering=false, failLogout=false;
const id='00000000-0000-0000-0000-000000000001';
const user={id,aud:'authenticated',role:'authenticated',email:'synthetic@example.test',email_confirmed_at:new Date().toISOString(),app_metadata:{provider:'email'},user_metadata:{},identities:[],created_at:new Date().toISOString()};
const encode=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
const token=`${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:id,role:'authenticated',aud:'authenticated',exp:Math.floor(Date.now()/1000)+3600})}.synthetic-signature`;
const transport=async (url,options={})=>{
  const target=new URL(url);
  assert.equal(target.origin,'http://127.0.0.1:54329');
  if(target.pathname.endsWith('/recover')) {recovering=true;return Response.json({});}
  if(target.pathname.endsWith('/token')) {
    const body=JSON.parse(options.body);
    if(target.searchParams.get('grant_type')==='pkce') assert(body.code_verifier?.length>20);
    return Response.json({access_token:token,refresh_token:'synthetic-refresh',token_type:'bearer',expires_in:3600,user});
  }
  if(target.pathname.endsWith('/user')) return Response.json(user);
  if(target.pathname.endsWith('/logout')) return failLogout?Response.json({msg:'Temporary failure'},{status:500}):new Response(null,{status:204});
  throw new Error(`Unexpected fake Auth request: ${target.pathname}`);
};
const cookies={getAll:()=>[...jar].map(([name,value])=>({name,value})),setAll:values=>{for(const {name,value,options} of values){if(options?.maxAge===0 || !value)jar.delete(name);else jar.set(name,value);}}};
const options={isSingleton:false,cookies,global:{fetch:transport},auth:{detectSessionInUrl:false,autoRefreshToken:false}};
const browser=createBrowserClient('http://127.0.0.1:54329','synthetic-anon-key',options);
let response=await browser.auth.signInWithPassword({email:user.email,password:'synthetic-password'});
assert.equal(response.error,null);assert(jar.size>0);
let server=createServerClient('http://127.0.0.1:54329','synthetic-anon-key',{cookies,global:{fetch:transport}});
assert.equal((await server.auth.getUser()).data.user.id,id);
failLogout=true;assert((await browser.auth.signOut({scope:'local'})).error);assert(jar.size>0);
failLogout=false;assert.equal((await browser.auth.signOut({scope:'local'})).error,null);assert.equal(jar.size,0);
await browser.auth.resetPasswordForEmail(user.email,{redirectTo:'https://www.gahnai.com/auth/callback'});
assert(recovering);assert([...jar.keys()].some(key=>key.includes('code-verifier')));
server=createServerClient('http://127.0.0.1:54329','synthetic-anon-key',{cookies,global:{fetch:transport}});
response=await server.auth.exchangeCodeForSession('synthetic-recovery-code');
assert.equal(response.error,null);assert.equal(response.data.redirectType,'recovery');
assert(![...jar.keys()].some(key=>key.includes('code-verifier')));
assert.equal((await server.auth.getUser()).data.user.id,id);
await server.auth.signOut({scope:'local'});
console.log('Installed Supabase SDK: password-session, cookie, logout-error and PKCE recovery checks passed with fake Auth transport.');
