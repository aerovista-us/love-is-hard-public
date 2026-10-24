/* Love Is Hard · eight distinct guided learning labs (browser-only data) */
(()=>{'use strict';
const match=location.pathname.match(/lesson-(0[1-8])\.html$/);if(!match)return;
const session=Number(match[1]),place=document.querySelector('.learning-interactive')||document.querySelector('.session-actions');if(!place)return;
const block=document.createElement('section');block.className='lesson-block learning-lab';block.id='learning-lab';
const intro=[
['Five-Part Separator Studio','Sort a statement by what it actually communicates. One sentence can contain more than one category.'],
['Meaning Check Lab','Watch two definitions diverge, then practice a paraphrase that can be corrected.'],
['Hidden Premise Decoder','Separate a valid need from a demanded strategy and the story attached to it.'],
['Reassurance Boundary Simulator','See how shifting requirements can keep a reassurance request open—and how to agree on a bounded ask.'],
['Conversation Route Map','Move through a real, interactive map of a fictional disagreement. Mark which turn could change the route.'],
['Boundary With Return Builder','Construct a practical pause that preserves dignity and specifies how to reconnect.'],
['Four-Lane Conflict Board','Sort relationship, work, safety and reputation concerns into distinct decisions.'],
['Shared Agreement Workshop','Create reciprocal, observable agreements that can be reviewed and revised.']
];
block.innerHTML='<div class="section-head"><span class="tag teal">Hands-on activity · Session '+session+'</span><h2>'+intro[session-1][0]+'</h2><p>'+intro[session-1][1]+'</p></div><div class="lab-screen"></div><p class="lab-caution">Practice with a fictional or low-stakes example. This tool describes interaction patterns; it does not decide who is right, establish motive, or replace safety planning.</p><div class="lab-actions"><button type="button" class="btn lab-export">Export lab notes</button><button type="button" class="btn lab-reset">Reset lab</button><span class="lab-status" role="status" aria-live="polite"></span></div>';
place.parentElement.insertBefore(block,place);
const screen=block.querySelector('.lab-screen'),status=block.querySelector('.lab-status'),key='lih-lab-v1-'+session;
const storage={};try{Object.assign(storage,JSON.parse(localStorage.getItem(key)||'{}'))}catch(e){}
let render=()=>{};
const save=()=>{try{localStorage.setItem(key,JSON.stringify(storage))}catch(e){status.textContent='Local storage unavailable. Export your notes instead.'}};
const elem=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n};
function panel(title,desc){const x=elem('article','lab-panel');x.append(elem('h3','',title),elem('p','',desc));screen.append(x);return x}
function button(where,title,callback){const b=elem('button','lab-choice',title);b.type='button';b.onclick=callback;where.append(b);return b}
function select(where,label,options,id){const l=elem('label','lab-field',label);const s=elem('select','');options.forEach(o=>{const e=elem('option','',o);e.value=o;s.append(e)});s.value=storage[id]||options[0];s.onchange=()=>{storage[id]=s.value;save();render()};l.append(s);where.append(l);return s}
function field(where,label,id,placeholder){const l=elem('label','lab-field',label),a=elem('textarea','');a.placeholder=placeholder||'';a.value=storage[id]||'';a.oninput=()=>{storage[id]=a.value;save()};l.append(a);where.append(l);return a}
function result(where,heading,text){const r=elem('aside','lab-feedback');r.append(elem('strong','',heading),elem('p','',text));where.append(r)}
if(session===1){
const p=panel('Sort the language','Choose the main kind of statement. Then read what could also be present.');const items=[
['I feel anxious when our plans change.','Feeling','Names an internal experience; the changed plans are a separate event.'],
['You changed the plan without telling me.','Observation','Potentially checkable: whether the change and notification occurred.'],
['I think you changed plans because you are tired of me.','Interpretation','Suggests an explanation of motive that needs checking.'],
['Can you text me when the plan changes?','Request','Describes a doable action; it can be negotiated.'],
['I cannot continue while we are yelling; I will return at seven.','Boundary','Names a limit and an intended return.']];
let position=Number(storage.position||0);const prompt=elem('div','lab-prompt'),answers=elem('div','lab-choices'),feedback=elem('div',''),nav=elem('div','lab-inline');p.append(prompt,answers,feedback,nav);const kinds=['Feeling','Observation','Interpretation','Request','Boundary'];
render=()=>{position=Math.max(0,Math.min(4,Number(storage.position||0)));prompt.textContent=(position+1)+' / 5 · “'+items[position][0]+'”';answers.replaceChildren();feedback.replaceChildren();kinds.forEach(k=>button(answers,k,()=>{storage['answer'+position]=k;save();render()}));const choice=storage['answer'+position];if(choice)result(feedback,choice===items[position][1]?'Good primary match':'Look for the main function',items[position][2]);nav.replaceChildren();button(nav,'← Earlier',()=>{storage.position=Math.max(0,position-1);save();render()}).disabled=position===0;button(nav,'Next →',()=>{storage.position=Math.min(4,position+1);save();render()}).disabled=position===4};
render();
}
if(session===2){
const p=panel('Two meanings can both be sincere','Select the word that sounds agreed on, then compare the possible meanings.');const meanings={Home:['A physical place or household','An experience of belonging and comfort'],Support:['Giving practical help or completing a task','Feeling emotionally accompanied and understood'],Respect:['Following an agreed limit','Feeling listened to without being dismissed']};
select(p,'Shared word',Object.keys(meanings),'word');const out=elem('div','lab-dual'),q=elem('div','');p.append(out,q);field(p,'Write a checking question','check','When you say support, do you mean... or something else?');render=()=>{const m=meanings[storage.word||'Home'];out.replaceChildren();['Possible meaning A','Possible meaning B'].forEach((t,i)=>{const c=elem('div','lab-tile');c.append(elem('strong','',t),elem('p','',m[i]));out.append(c)});q.replaceChildren();result(q,'What to notice','The mismatch need not mean deception. Ask which meaning is intended before evaluating the claim.')};render();
}
if(session===3){
const p=panel('Decode the request','Choose which part to examine first.');const sentence=elem('blockquote','lab-quote','“If you cared about me, you would answer my messages immediately.”');p.append(sentence);
select(p,'Examine this layer',['Need','Strategy','Unverified inference'],'layer');const out=elem('div','');p.append(out);render=()=>{out.replaceChildren();const map={'Need':'Connection, predictability, or reassurance may matter.','Strategy':'Immediate replies are one possible method, but availability and context need discussion.','Unverified inference':'Delay is being used as evidence of a lack of care; that cause is not established by timing alone.'};result(out,storage.layer||'Need',map[storage.layer||'Need'])};render();field(p,'Rewrite as a clean request','rewrite','I felt worried when I did not hear back. Can we agree on a check-in window?');
}
if(session===4){
const p=panel('When does an answer count?','Follow a hypothetical reassurance request without deciding either person’s motivation.');
const stages=['Ask: “Can you tell me you care?”','Answer: “I care about you, and I’m here.”','New ask: “Then say it another way.”','Another ask: “Show me publicly or it doesn’t count.”'];
let n=Number(storage.stage||0);const display=elem('div','lab-route-current'),buttons=elem('div','lab-inline'),feedback=elem('div','');p.append(display,buttons,feedback);
render=()=>{n=Math.min(3,Math.max(0,Number(storage.stage||0)));display.textContent='Turn '+(n+1)+': '+stages[n];buttons.replaceChildren();button(buttons,'← Previous',()=>{storage.stage=Math.max(n-1,0);save();render()}).disabled=n===0;button(buttons,'Next turn →',()=>{storage.stage=Math.min(n+1,3);save();render()}).disabled=n===3;feedback.replaceChildren();result(feedback,n<2?'Initial request':'Requirement change',n<2?'A specific request can be answered and received. Context still matters.':'Notice the changing standard. A reasonable reset is to ask what evidence could count and agree on a review point without requiring endless proof.')};render();field(p,'Write a bounded reassurance request','bounded','Could we check in for ten minutes tonight and agree when to revisit this?');
}
if(session===5){
const p=panel('Follow a conversation, not a street','Select a turn on the route to see what was spoken, what someone may infer, and which question could change the next step.');
const turns=[
['Opening','A: “When you said I wasn’t helping, I wanted to explain…”','An unfinished explanation may seem familiar.','Let the thought finish before responding.'],
['Prediction','B: “You are about to list all the things you did.”','The anticipated ending begins to function as a spoken claim.','“Is that what you were going to say?”'],
['Correction','A: “No—that isn’t the point. Can I finish?”','Correction may sound like a refusal to acknowledge hurt.','“Okay, finish, and then let’s return to what hurt.”'],
['Reaction','B: “Now you are avoiding my feelings.”','The discussion is shifting toward the response to the correction.','Distinguish the feeling, prediction, and actual words.'],
['Escalation','A: “You never let me talk!”','A frustrated generalization becomes a new grievance.','Own the generalization and return to the original subject.'],
['Repair fork','Both choose whether to clarify or continue the dispute.','Neither initial intent nor ultimate blame follows from this excerpt.','“What were you going to say, and what did I hear?”']
];let n=Number(storage.turn||0);const nav=elem('div','lab-route'),display=elem('div','lab-route-detail'),controls=elem('div','lab-inline');p.append(nav,display,controls);
render=()=>{n=Math.min(5,Math.max(0,Number(storage.turn||0)));nav.replaceChildren();turns.forEach((t,i)=>{const b=button(nav,(i+1)+'. '+t[0],()=>{storage.turn=i;save();render()});if(i===n)b.classList.add('active')});display.replaceChildren();display.append(elem('h3','',turns[n][0]),elem('p','lab-route-current',turns[n][1]));result(display,'Possible interpretation · not established fact',turns[n][2]);result(display,'Possible reset',turns[n][3]);controls.replaceChildren();button(controls,'← Previous turn',()=>{storage.turn=Math.max(n-1,0);save();render()}).disabled=n===0;button(controls,'Next turn →',()=>{storage.turn=Math.min(n+1,5);save();render()}).disabled=n===5};render();
select(p,'Where could a meaning check change the route?',turns.map(t=>t[0]),'fork');field(p,'What exactly would you ask at that moment?','question','Can you finish that thought before I explain what I heard?');
}
if(session===6){
const p=panel('Make the pause concrete','A pause is more useful with a specific return plan; an unsafe situation may require a different response.');
select(p,'Reason to pause',['I am becoming overwhelmed','We are interrupting each other','We need facts or time to think'],'reason');
select(p,'Return plan',['In 20 minutes at an agreed place','This evening at an agreed hour','Tomorrow after sleep, with a confirmed time'],'return');
field(p,'One thing I will own','ownership','I raised my voice and want to repair that.');
const preview=elem('div','');p.append(preview);render=()=>{preview.replaceChildren();result(preview,'Suggested wording','“I care about resolving this. '+(storage.reason||'I am becoming overwhelmed').toLowerCase()+'. I need to pause. Let’s return '+(storage.return||'In 20 minutes at an agreed place').toLowerCase()+'. My limit is about the conversation, not a verdict about you.”')};render();
}
if(session===7){
const p=panel('Choose the lane','Select a concern and identify the kind of decision needed.');const examples={'Missed planned dinner':['Relationship','Acknowledge disappointment and renegotiate a commitment.'],'Uninterrupted deadline time':['Operations','Define availability, interruption rules, and backup contact.'],'Threatening messages':['Safety','Prioritize protection and outside support rather than an ordinary dispute exercise.'],'A disputed public allegation':['Reputation','Verify exact claims, privacy, and appropriate response channels.']};
select(p,'Scenario',Object.keys(examples),'scenario');const out=elem('div','');p.append(out);render=()=>{out.replaceChildren();const [lane,step]=examples[storage.scenario||Object.keys(examples)[0]];result(out,'Primary lane: '+lane,step+' Other lanes may matter too.')};render();field(p,'What is a practical next action?','next','We can discuss the missed commitment separately from the work deadline.');
}
if(session===8){
const p=panel('Design a living agreement','Make commitments reciprocal, observable, and revisable. No one should have to concede a disputed motive to use the process.');
select(p,'Communication commitment',['Each speaker can finish a thought before a response','Both check interpretations as questions, not settled facts','Either can request a time-bound pause'],'commitment');
select(p,'Repair process',['Clarify what was said and what was heard','Own observable behavior without forced confessions','Return to one agreed issue after a pause'],'repair');
select(p,'Review schedule',['Review in one week','Review in two weeks','Review in one month'],'review');
field(p,'What will both people do when this rule fails?','fallback','Pause, acknowledge the interruption, and offer the unfinished thought another turn.');
const preview=elem('div','');p.append(preview);render=()=>{preview.replaceChildren();result(preview,'Your draft agreement',(storage.commitment||'Each speaker can finish a thought before a response')+'. When there is a misunderstanding: '+(storage.repair||'Clarify what was said and what was heard').toLowerCase()+'. '+(storage.review||'Review in one week')+'.')};render();
}
block.querySelector('.lab-export').onclick=()=>{const text='Love Is Hard — Session '+session+' Lab\n'+intro[session-1][0]+'\n\n'+JSON.stringify(storage,null,2);const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='love-is-hard-session-'+session+'-lab.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Exported to a text file.'};
block.querySelector('.lab-reset').onclick=()=>{if(!confirm('Clear this activity on this device?'))return;Object.keys(storage).forEach(k=>delete storage[k]);try{localStorage.removeItem(key)}catch(e){}location.reload()};
})();
