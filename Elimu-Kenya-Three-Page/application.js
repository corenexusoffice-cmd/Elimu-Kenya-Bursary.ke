'use strict';
const $=s=>document.querySelector(s);const amounts={1:20000,2:16250,3:12500,4:8750,5:5000};const money=n=>'KSh '+n.toLocaleString('en-KE');
const form=$('#application');let step=0;const labels=['Studies and funding','Personal details','Review application'];
function data(){const fields=[...form.querySelectorAll('fieldset')];fields.forEach(f=>f.disabled=false);const d=Object.fromEntries(new FormData(form));fields.forEach((f,i)=>f.disabled=i!==step);return d;}
function render(){form.querySelectorAll('fieldset').forEach((f,i)=>{f.hidden=i!==step;f.disabled=i!==step;});$('#stepLabel').textContent=`0${step+1} / ${labels[step]}`;$('#stepNumber').textContent=`STEP ${step+1} OF 3`;$('#progressBar').style.width=((step+1)/3*100)+'%';$('#back').hidden=step===0;$('#continue').textContent=step===2?'Continue to payment availability →':'Continue →';$('#formStatus').textContent='';if(step===2){const d=data();$('#review').replaceChildren();[['Name',d.student],['Year of birth',d.birthYear],['Email',d.email],['Phone',d.phone],['University',d.university],['Course / year',d.course+' / '+d.year],['HELB / HEF support',d.helb],['Funding band','Band '+d.band],['System-assigned proposed amount',money(amounts[d.band])],['Home county',d.county],['Sub-county',d.subcounty],['Town / village',d.town],['Location',d.location],['Sub-location',d.sublocation],['Parent / guardian',d.guardian+' ('+d.relationship+')'],['Circumstances',d.condition],['Additional information',d.story||'Not provided']].forEach(([k,v])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k;dd.textContent=v;$('#review').append(dt,dd);});}}
$('#continue').onclick=()=>{
 if(!form.reportValidity())return;
 if(step<2){step++;render();const legend=form.querySelector('fieldset:not([hidden]) legend');if(legend){legend.tabIndex=-1;legend.focus();}return;}
 const d=data();if(!Object.hasOwn(amounts,d.band))return;
 // Navigate only. No server submission, payment claim or personal data in the URL.
 window.location.assign('pay.html');
};
$('#back').onclick=()=>{step--;render();};form.onsubmit=e=>{e.preventDefault();$('#continue').click();};$('#save').onclick=()=>{const d=data();delete d.consent;try{localStorage.setItem('elimu-demo-draft',JSON.stringify(d));$('#formStatus').textContent='Draft saved on this device.';}catch{$('#formStatus').textContent='Unable to save on this browser.';}};
$('#clearDraft').onclick=()=>{try{localStorage.removeItem('elimu-demo-draft');}catch{}form.reset();filterUniversities();step=0;form.hidden=false;render();$('#formStatus').textContent='Draft cleared. Form reset.';};
function filterUniversities(){const q=$('#universitySearch').value.trim().toLowerCase();let count=0;[...$('#universityList').options].forEach((o,i)=>{o.hidden=i>0&&!o.textContent.toLowerCase().includes(q);if(i>0&&!o.hidden)count++;});$('#universityCount').textContent=count+' institutions shown. Scroll the list or search above.';}
$('#universitySearch').oninput=filterUniversities;
try{const d=JSON.parse(localStorage.getItem('elimu-demo-draft')||'null');if(d&&typeof d==='object')Object.entries(d).forEach(([k,v])=>{if(form.elements[k]&&typeof v==='string')form.elements[k].value=v;});}catch{}filterUniversities();render();
