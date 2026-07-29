import { writeFileSync } from 'node:fs';

const siteUrl = 'https://aerovista-us.github.io/love-is-hard-public/';
const description = 'An eight-session Summit Learning program for communication and pattern literacy.';
const assetVersion = '2026-07-28-course-flow';

const navGroups = [
  {
    label: 'Learn',
    links: [
      ['index.html', 'Start', 'Start'],
      ['lesson-01.html', 'Name the Pieces', 'Feeling Before Verdict'],
      ['lesson-02.html', 'Hear Clearly', 'Hear Without Surrendering Reality'],
      ['lesson-03.html', 'Hidden Premise', 'Find the Hidden Premise'],
      ['lesson-04.html', 'Proof Pressure', 'Recognize Proof Pressure'],
      ['lesson-05.html', 'Escalation Map', 'Map the Escalation'],
      ['lesson-06.html', 'Boundaries', 'Protect Boundaries and Repair Delivery'],
      ['lesson-07.html', 'Operations', 'Separate Love From Operations'],
      ['lesson-08.html', 'Agreement', 'Build an Operating Agreement'],
    ],
  },
  {
    label: 'Practice',
    links: [
      ['worksheet.html', 'Workbook', 'Workbook'],
      ['tools.html', 'Tools', 'Tools'],
    ],
  },
  {
    label: 'Listen',
    links: [
      ['songs.html', 'Audio', 'Audio Lenses'],
      ['player.html', 'Player', 'MP3 Player'],
    ],
  },
  {
    label: 'Facilitate',
    links: [
      ['facilitator.html', 'Facilitator', 'Facilitator'],
    ],
  },
  {
    label: 'About',
    links: [
      ['guardrails.html', 'Guardrails', 'Guardrails'],
    ],
  },
];

const sessions = [
  {
    file: 'lesson-01.html',
    short: 'Session 1',
    name: 'Name the Pieces',
    title: 'Feeling Before Verdict',
    output: 'Five-Part Separator',
    workbook: 'separator',
    tool: 'separator-tool',
    audio: 'Head vs. Heart',
    progressTitle: 'Feelings, Claims, and Hearing',
    lead: 'Start with what you know: what you are feeling. Then separate the meaning you made from what has actually been observed or established.',
    tag: 'Precision',
    concepts: [
      ['Feeling vs Claim', 'A feeling is internal experience. A claim is an assertion of cause, motive, character, or responsibility.', 'I feel scared and need clarity.', 'You obviously do not care.', 'I feel ___, and the interpretation I am making is ___. Can we check it?', 'Watch for always, never, obviously, and if you cared.'],
      ['Interpretation Check', 'The first explanation may be compelling without being complete.', 'I am noticing a fear story and want to verify it.', 'My fear is proof that your motive is bad.', 'The meaning I made was ___. Is that what you meant?', 'Watch for mind-reading and instant certainty.'],
      ['Clean Request', 'A request names what would help without making the other person confess to a hidden charge.', 'Can we talk for 20 minutes at 6:30?', 'Prove I matter right now or this means everything.', 'What I am asking for is ___. Is that available?', 'Watch for requests that require surrendering reality.'],
    ],
    practice: 'Rewrite one loaded sentence into five parts: what I felt, what I interpreted, what I claimed, what I needed, and what boundary or capacity limit was present.',
    next: ['lesson-02.html', 'Next: When Reassurance Becomes a Test'],
    prev: ['index.html', 'Back: Start'],
  },
  {
    file: 'lesson-02.html',
    short: 'Session 2',
    name: 'Hear Clearly',
    title: 'Hear Without Surrendering Reality',
    output: 'Shared Definition Check',
    workbook: 'hidden',
    tool: 'glossary-tool',
    audio: 'After We Learned to Hear Each Other',
    lead: 'Hearing someone well does not require agreeing with every interpretation or accepting every premise.',
    tag: 'Precision',
    concepts: [
      ['Hearing vs Agreement', 'Listening can validate pain while still checking the story attached to it.', 'I hear that this hurt. I do not agree with the motive assigned to me.', 'If you hear me, you must admit my version is true.', 'I can hear the impact and still need to clarify the claim.', 'Watch for “so you admit...” after validation.'],
      ['Meaning Substitution', 'Exact words and inferred meaning are not the same object.', 'Let us return to the exact sentence.', 'What you really meant was the worst possible version.', 'The sentence I said was ___. The meaning you heard was ___. Let us separate them.', 'Watch for “so what you are saying is...” when it changes the words.'],
      ['False Agreement', 'People can use the same word while meaning different things.', 'Let us define support before we decide whether it happened.', 'You said support, so you owe the version in my head.', 'When I say ___, I mean ___. What do you mean?', 'Watch for slippery words that carry different rules.'],
    ],
    practice: 'Choose one charged word such as support, care, space, proof, or partner. Write both definitions before debating the conflict.',
    prev: ['lesson-01.html', 'Back: Name Pieces'],
    next: ['lesson-03.html', 'Next: Hidden Premise'],
  },
  {
    file: 'lesson-03.html',
    short: 'Session 3',
    name: 'Hidden Premise',
    title: 'Find the Hidden Premise',
    output: 'Hidden-Premise Rewrite',
    workbook: 'hidden',
    tool: 'glossary-tool',
    audio: "Hearing Ain't the Same as Listenin",
    lead: 'A need can be valid while the demanded strategy is not. Hidden premises turn needs into accusations.',
    tag: 'Precision',
    concepts: [
      ['Need vs Strategy', 'The need may deserve care; the method demanded to meet it may still be negotiable.', 'I need predictable connection.', 'You must be available all day or I am not chosen.', 'The need is ___. A workable strategy could be ___.', 'Watch for one strategy being treated as the only proof of love.'],
      ['Hidden Claims', 'A request can quietly accuse: “do this” may mean “or admit you failed me.”', 'Can we schedule a check-in?', 'If you will not stop now, you do not value me.', 'The hidden premise might be ___. The clean ask is ___.', 'Watch for compliments, apologies, and questions that carry charges.'],
      ['Trust Paradox', 'An unfinishable test cannot build trust because every answer becomes the next test.', 'Ask once, receive, regulate, reconnect later.', 'Answer until the fear disappears completely.', 'I can answer once. If it does not land, we pause and return.', 'Watch for retesting after reassurance was already given.'],
    ],
    practice: 'Take one demand and split it into need, strategy, hidden claim, and clean request.',
    prev: ['lesson-02.html', 'Back: Hear Clearly'],
    next: ['lesson-04.html', 'Next: Proof Pressure'],
  },
  {
    file: 'lesson-04.html',
    short: 'Session 4',
    name: 'Proof Pressure',
    title: 'Recognize Proof Pressure',
    output: 'Proof-to-Request Script',
    workbook: 'hidden',
    tool: 'interruption-tool',
    audio: 'Proof I Care',
    lead: 'Recognition becomes pressure when care must be proven again, immediately, and on a moving bar.',
    tag: 'Escalation',
    concepts: [
      ['Recognition vs Proof', 'Recognition says “I see this matters.” Proof pressure says “demonstrate it until my fear is gone.”', 'Thank you for naming it; I will let that land.', 'Say it again differently until I feel certain.', 'I can recognize the pain. I cannot enter an endless proof loop.', 'Watch for admit, confess, prove, and if you loved me.'],
      ['Moving Bar', 'The answer changes requirements after it is given.', 'Ask, answer, receive, regulate.', 'That answer does not count because now I need another form.', 'I answered the ask we named. If it still hurts, we need a pause.', 'Watch for reassurance that is never allowed to land.'],
      ['Confession Frame', 'Repair cannot require accepting an unverified premise as the entry fee.', 'I own interrupting and raising my voice.', 'I will only feel repaired if you admit you meant to hurt me.', 'I can own my behavior without confessing to a motive I do not believe is true.', 'Watch for apology demands that erase boundaries.'],
    ],
    practice: 'Turn a proof demand into a time-bound request: one reassurance sentence, one return time, one self-regulation step.',
    prev: ['lesson-03.html', 'Back: Hidden Premise'],
    next: ['lesson-05.html', 'Next: Escalation Map'],
  },
  {
    file: 'lesson-05.html',
    short: 'Session 5',
    name: 'Escalation Map',
    title: 'Map the Escalation',
    output: 'Escalation Sequence Map',
    workbook: 'sequence',
    tool: 'loop-tool',
    audio: 'How Does It Hurt Me',
    lead: 'Reactions matter, and so does the sequence before the reaction. The Borrowed War Loop gives the pattern a public-safe map.',
    tag: 'Escalation',
    concepts: [
      ['Completion Suppression', 'A person cannot answer clearly if every sentence opens a new charge before it finishes.', 'One sentence, then response.', 'Interrupt, stack claims, then judge the reaction.', 'I will answer that after I finish this point.', 'Watch for topic acceleration.'],
      ['Reaction Capture', 'The reaction becomes the evidence while the build-up disappears.', 'We map before, during, and after.', 'Your frustration proves my whole story.', 'My reaction belongs to me; the sequence still matters.', 'Watch for the last five seconds replacing the last five hours.'],
      ['Borrowed War Loop', 'Pain may borrow an external battlefield: distress rises, gets assigned outward, becomes conflict, meets a boundary, escalates, crashes, then seeks repair.', 'Name the stage and interrupt the loop.', 'Treat one person as the war itself.', 'I care about the pain, and I am not joining the war.', 'Watch for a repair request that restarts the same battle.'],
    ],
    practice: 'Map a composite conflict in seven stages: distress, assignment, pressure, boundary, escalation, crash, repair-seeking.',
    prev: ['lesson-04.html', 'Back: Proof Pressure'],
    next: ['lesson-06.html', 'Next: Boundaries'],
  },
  {
    file: 'lesson-06.html',
    short: 'Session 6',
    name: 'Boundaries',
    title: 'Protect Boundaries and Repair Delivery',
    output: 'Boundary With Return',
    workbook: 'boundary',
    tool: 'pause-tool',
    audio: "Peace Ain't a Prison",
    lead: 'A boundary can hurt without being abandonment. Repair can include ownership without self-erasure.',
    tag: 'Repair',
    concepts: [
      ['Boundary vs Abandonment', 'A limit is not disappearance when it includes what stops, why, and when return happens.', 'I am pausing for 20 minutes and will return at 7:00.', 'Any pause means you are leaving me.', 'I care about you. I am stopping now so I do not escalate.', 'Watch for treating capacity limits as rejection.'],
      ['Split Apology', 'Own behavior without apologizing for having a boundary.', 'I regret raising my voice. I still needed to pause.', 'I am sorry I had a limit.', 'What I did was ___. What remains true is ___.', 'Watch for apologies that buy peace by deleting reality.'],
      ['Pretty Repair', 'Warmth, tears, promises, or affection are not repair unless the pattern changes.', 'Recognition, ownership, changed behavior, follow-through.', 'A beautiful apology that resets the same loop tomorrow.', 'What will be different next time is ___.', 'Watch for repair theater without a gate.'],
    ],
    practice: 'Build a boundary with return: limit, reason, return time, return conditions, and repair topic.',
    prev: ['lesson-05.html', 'Back: Escalation Map'],
    next: ['lesson-07.html', 'Next: Operations'],
  },
  {
    file: 'lesson-07.html',
    short: 'Session 7',
    name: 'Operations',
    title: 'Separate Love From Operations',
    output: 'Conflict Lane Map',
    workbook: 'truths',
    tool: 'agreement-tool',
    audio: 'Nothing Left to Prove',
    lead: 'Love, work, time, pace, public reputation, and role authority are different lanes.',
    tag: 'Operations',
    concepts: [
      ['Support vs Absorption', 'Care is not total emotional responsibility.', 'Brief support plus scheduled return.', 'You must fix my fear in real time or you do not love me.', 'I can support you for __ minutes, then I return at ___.', 'Watch for regulation transfer.'],
      ['Pace and Capacity', 'Urgency does not create availability.', 'This matters, and the workable window is 6:30.', 'If it matters, you must stop everything now.', 'I cannot do this while working. I can do ___ at ___.', 'Watch for work focus being framed as rejection.'],
      ['Public/Private Separation', 'A conflict does not become healthier when it moves into public retaliation.', 'Handle harm through direct repair, mediation, or safety channels.', 'Make the public pick a villain.', 'I will not litigate this publicly. I will address the behavior through the right lane.', 'Watch for posts, proof displays, or reputation pressure.'],
    ],
    practice: 'Sort a conflict into lanes: love, operations, safety, public/private, and what each lane actually needs.',
    prev: ['lesson-06.html', 'Back: Boundaries'],
    next: ['lesson-08.html', 'Next: Agreement'],
  },
  {
    file: 'lesson-08.html',
    short: 'Session 8',
    name: 'Agreement',
    title: 'Build an Operating Agreement',
    output: 'Operating Agreement',
    workbook: 'gate',
    tool: 'agreement-tool',
    audio: 'Finding the Middle',
    lead: 'Convert recurring conflict into shared rules, review dates, and scripts before the next escalation.',
    tag: 'Operations',
    concepts: [
      ['Single Source of Truth', 'Define the rules in one place so words cannot be re-labeled during conflict.', 'We use the agreement definitions first.', 'Every fight renegotiates the dictionary.', 'Let us check the term before debating the event.', 'Watch for word-games under stress.'],
      ['Pause Protocol', 'Either person can stop a flooded conversation and return with a plan.', 'PAUSE, 20 minutes minimum, one agenda item, 15-30 minute return window.', 'Chasing, texting, proving, or punishing during the pause.', 'I am at capacity. PAUSE. We return at ___ for ___ minutes.', 'Watch for a pause being treated as a new offense.'],
      ['Review Date', 'Agreements need scheduled review so they do not become a frozen contract or a control mechanism.', 'One recurring conflict, one protocol, one review date.', 'Rules used as threats or scorekeeping.', 'We review this on ___ and change what is not reducing pressure.', 'Watch for the tool becoming another battlefield.'],
    ],
    practice: 'Choose one recurring conflict. Write the need, allowed strategy, not-allowed behavior, pause script, repair gate, and review date.',
    prev: ['lesson-07.html', 'Back: Operations'],
    next: ['worksheet.html', 'Next: Workbook'],
  },
];

const songs = [
  ['Recognition and Difference', 'Head vs. Heart', 'Session 1', 'Feeling and interpretation can both need room before either becomes a verdict.', 'What would each person need to say for logic and feeling to stand together?', 'lesson-01.html'],
  ['Recognition and Difference', 'After We Learned to Hear Each Other', 'Session 2', 'A hopeful counterweight: repair becomes possible when hearing turns into curiosity.', 'What changes when listening is not cross-examination?', 'lesson-02.html'],
  ['Listening and Proof', "Hearing Ain't the Same as Listenin", 'Session 2', 'Passive hearing is not the same as active recognition, and recognition is not surrender.', 'What sentence would show that listening actually happened?', 'lesson-02.html'],
  ['Listening and Proof', 'Proof I Care', 'Session 4', 'A clean reminder that care can be offered without entering an endless proof loop.', 'Where is the line between reassurance and a test?', 'lesson-04.html'],
  ['Listening and Proof', "Feelings Ain't Facts", 'Session 1', 'Feelings deserve support; claims deserve checking.', 'How can pain be validated without validating an untested story?', 'lesson-01.html'],
  ['Capacity and Boundaries', 'How Does It Hurt Me', 'Session 5', 'Repeated restart, interruption, and escalation have a real capacity cost.', 'What is the cost of restarting someone over and over?', 'lesson-05.html'],
  ['Capacity and Boundaries', 'Baseline', 'Session 6', 'Space, rest, and respect are baseline needs, not rewards to earn.', 'What care should never become a bargaining chip?', 'lesson-06.html'],
  ['Capacity and Boundaries', "Peace Ain't a Prison", 'Session 6', 'A boundary can protect peace without becoming punishment.', 'What makes a pause responsible rather than avoidant?', 'lesson-06.html'],
  ['Accountability and Two Truths', "Ain't One-Sided (I See It Clean)", 'Session 6', 'Shared responsibility can be named without making both actions identical.', 'What belongs to each person, and what belongs to the cycle?', 'lesson-06.html'],
  ['Accountability and Two Truths', 'Two Things True', 'Session 6', 'Pain and protection can coexist without canceling each other.', 'Write two truths that can sit beside each other.', 'lesson-06.html'],
  ['Accountability and Two Truths', 'Finding the Middle', 'Session 8', 'Agreement work asks both people to move from positions into workable rules.', 'What rule would reduce pressure instead of winning an argument?', 'lesson-08.html'],
  ['Repair and Release', 'Still Counts (Remix)', 'Session 6', 'Progress still counts even when repair is incomplete.', 'What improvement should remain counted after a setback?', 'lesson-06.html'],
  ['Repair and Release', 'Nothing Left to Prove', 'Session 7', 'Leaving proof pressure is not the same as refusing care.', 'What proof demand needs to become a clean request or an exit?', 'lesson-07.html'],
  ['Repair and Release', 'The Narrator', 'Session 7', 'The final lens: who gets to define the story, and what remains unknown?', 'What would a dual-narrative timeline preserve?', 'lesson-07.html'],
];

const playlist = [
  ['After We Learned to Hear Each Other', './audio/after-we-learned-to-hear-each-other.mp3'],
  ['Head vs. Heart', './audio/head-vs-heart.mp3'],
  ["Hearing Ain't the Same as Listenin", './audio/hearing-aint-the-same-as-listenin.mp3'],
  ["Ain't One-Sided (I See It Clean)", './audio/aint-one-sided-i-see-it-clean.mp3'],
  ['Baseline', './audio/baseline.mp3'],
  ['Two Things True', './audio/two-things-true.mp3'],
  ["Peace Ain't a Prison", './audio/peace-aint-a-prison.mp3'],
  ['Finding the Middle', './audio/finding-the-middle.mp3'],
  ['How Does It Hurt Me', './audio/how-does-it-hurt-me.mp3'],
  ["Feelings Ain't Facts", './audio/feelings-aint-facts.mp3'],
  ['Proof I Care', './audio/proof-i-care.mp3'],
  ['Still Counts (Remix)', './audio/still-counts-remix.mp3'],
  ['Nothing Left to Prove', './audio/nothing-left-to-prove.mp3'],
  ['The Narrator', './audio/the-narrator.mp3'],
];

const songSlugs = {
  'Head vs. Heart': 'head-vs-heart',
  'After We Learned to Hear Each Other': 'after-we-learned-to-hear-each-other',
  "Hearing Ain't the Same as Listenin": 'hearing-aint-the-same-as-listenin',
  'Proof I Care': 'proof-i-care',
  'How Does It Hurt Me': 'how-does-it-hurt-me',
  "Peace Ain't a Prison": 'peace-aint-a-prison',
  'Nothing Left to Prove': 'nothing-left-to-prove',
  'Finding the Middle': 'finding-the-middle',
};

const glossary = [
  ['Need', 'A core human requirement for stability or well-being. A need is not the same as a demanded strategy.'],
  ['Strategy', 'A method used to meet a need. Strategies can be refused, revised, or replaced without denying the need.'],
  ['Boundary', 'A limit enforced without debate in the escalation moment. It should include what stops and when return is possible.'],
  ['Proof Demand', 'A request that tries to prove a negative or requires repeated access, confession, or performance to relieve fear.'],
  ['Support vs Regulation', 'Support is brief care, clarity, and scheduling. Regulation transfer makes one person responsible for removing another person’s fear in real time.'],
  ['Effort as Currency', 'Using basic respect, calm, or prior effort as leverage for repayment later.'],
  ['Meaning Substitution', 'Replacing exact words with an inferred meaning, then arguing against the inference as if it was said.'],
  ['Moving Bar', 'Changing the requirement after reassurance, explanation, or repair has already been offered.'],
  ['Pause Protocol', 'A structured stop: PAUSE, separation window, no chasing, one agenda item, return time, and protected sleep.'],
  ['Repair Gate', 'Repair must include recognition, ownership, changed behavior, and follow-through, not warmth alone.'],
];

function pageTitle(title) {
  return title === 'Love Is Hard' ? 'Love Is Hard: When Conversations Become Tests | Summit Learning' : `${title} | Love Is Hard`;
}

function socialTitle(title) {
  return title === 'Love Is Hard' ? 'Love Is Hard: When Conversations Become Tests' : `${title} | Love Is Hard`;
}

function head(title) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${pageTitle(title)}</title>
  <meta name="description" content="${description}" />
  <link rel="icon" type="image/svg+xml" href="./assets/favicon.svg" />
  <meta name="theme-color" content="#17202b" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Love Is Hard" />
  <meta property="og:title" content="${socialTitle(title)}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${siteUrl}assets/og-image.png" />
  <meta property="og:image:width" content="1731" />
  <meta property="og:image:height" content="909" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${socialTitle(title)}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${siteUrl}assets/og-image.png" />
  <link rel="stylesheet" href="./styles.css?v=${assetVersion}" />
</head>`;
}

function header(file, progressLabel = '') {
  const progress = sessions.findIndex((s) => s.file === file) + 1;
  const label = progress ? `Session ${progress} of 8 | ${sessions[progress - 1].progressTitle || sessions[progress - 1].title}` : progressLabel;
  const width = progress ? Math.round((progress / 8) * 100) : 0;
  const activeGroup = navGroups.find((group) => group.links.some(([href]) => href === file));
  const activeLink = activeGroup?.links.find(([href]) => href === file);
  const menuLabel = activeGroup && activeLink ? `${activeGroup.label} / ${activeLink[1]}` : 'Open navigation';
  const links = navGroups.map((group) => {
    const items = group.links.map(([href, label, title], index) => {
      const marker = group.label === 'Learn' && href !== 'index.html' ? index : index + 1;
      return `<a href="./${href}" class="${href === file ? 'active' : ''}" aria-label="${group.label}: ${href === 'index.html' ? 'Start' : `${marker}. ${label}`}"><span aria-hidden="true">${href === 'index.html' ? 'Start' : marker}</span><strong>${label}</strong><small aria-hidden="true">${title}</small></a>`;
    }).join('');
    return `<section class="nav-group" aria-labelledby="nav-${group.label.toLowerCase()}"><h2 id="nav-${group.label.toLowerCase()}">${group.label}</h2><div>${items}</div></section>`;
  }).join('');
  return `<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="nav-shell">
      <div class="brand-row"><a class="brand" href="./index.html">Love Is Hard</a><span class="progress-label">${label}</span></div>
      <details class="menu-shell">
        <summary aria-label="Open site navigation: ${menuLabel}"><span aria-hidden="true">Menu</span><strong>${menuLabel}</strong></summary>
        <nav class="nav-links" aria-label="Site navigation">${links}</nav>
      </details>
      ${progress ? `<div class="progress-bar" aria-hidden="true"><span style="width:${width}%"></span></div>` : ''}
    </div>
  </header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap"><span><strong>Love Is Hard</strong> | A Summit Learning Release</span><span>Educational material for communication and pattern recognition. Not diagnosis, therapy, legal advice, or a verdict about any individual.</span></div></footer>
  <script src="./player.js?v=${assetVersion}"></script>
</body>
</html>`;
}

function page(file, title, body, progressLabel = '') {
  writeFileSync(`site/${file}`, `${head(title)}
${header(file, progressLabel)}
${body}
${footer()}
`);
}


function slugForSong(title) {
  return songSlugs[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function sessionMeta(s, index) {
  return `<div class="session-meta"><span>10-15 minutes</span><span>Output: ${s.output}</span><span>Audio lens: ${s.audio}</span></div>`;
}

function sessionActions(s) {
  const nextLabel = s.next?.[1] || 'Continue learning';
  const song = slugForSong(s.audio);
  return `<section class="session-actions" aria-label="Session actions"><a class="btn" href="./worksheet.html#${s.workbook}">Practice this</a><a class="btn" href="./tools.html#${s.tool}">Use this now</a><a class="btn" href="./player.html?track=${song}">Hear the pattern</a><button class="btn complete-session" type="button" data-session="${s.file}">Complete Session</button><a class="btn primary" href="./${s.next[0]}">${nextLabel}</a></section>`;
}

function sessionHero(s, index) {
  return `<div class="section-head"><span class="tag copper">Session ${index + 1}: ${s.name}</span><h1>${s.name}</h1><p class="subtitle"><em>${s.title}</em></p><p>${s.lead}</p>${sessionMeta(s, index)}</div>`;
}

function facilitatorPlans() {
  const stopConditions = [
    'Stop if participants use the distinction to invalidate a feeling or force agreement with a claim.',
    'Stop if listening is being treated as mandatory agreement.',
    'Stop if a need becomes one non-negotiable strategy or a character accusation.',
    'Stop if reassurance becomes repeated proof, confession, or immediate access pressure.',
    'Stop if the group judges only the visible reaction and refuses to map the sequence before it.',
    'Stop if a boundary is framed as abandonment or repair is used to erase a limit.',
    'Stop if operations, safety, reputation, and love are being collapsed into one demand.',
    'Stop if the agreement becomes scorekeeping, surveillance, or a frozen contract.',
  ];
  const closingScripts = [
    'A feeling gets care. A claim gets checked. A request gets made clearly.',
    'I can hear impact without surrendering reality.',
    'The need may be valid even when the demanded strategy needs revision.',
    'Care can be offered without entering an endless proof loop.',
    'The reaction matters, and the full sequence matters too.',
    'A responsible boundary names what stops, why, and when return happens.',
    'Love, work, safety, and public reputation need separate lanes.',
    'The agreement is a repair tool, not a weapon.',
  ];
  return `<section class="facilitator-plans"><div class="section-head"><h2>Session Plans</h2><p>Use each block as a compact facilitation guide. Keep the work focused on pattern literacy, not adjudicating private motives.</p></div>${sessions.map((s, i) => {
    const healthy = s.concepts[0][2];
    const distorted = s.concepts[0][3];
    return `<details class="facilitator-session"><summary><span aria-hidden="true">${i + 1}</span><strong>${s.name}</strong><small>${s.output}</small></summary><div class="facilitator-body"><dl><dt>Session objective</dt><dd>${s.lead}</dd><dt>Opening question</dt><dd>Where does this pattern show up before anyone has to decide who is right?</dd><dt>Healthy example</dt><dd>${healthy}</dd><dt>Distorted example</dt><dd>${distorted}</dd><dt>Practice exercise</dt><dd>${s.practice}</dd><dt>Debrief question</dt><dd>What became clearer when the pieces were separated?</dd><dt>Common misuse</dt><dd>Using the lesson language to win the conflict instead of slowing the pattern.</dd><dt>Stop condition</dt><dd>${stopConditions[i]}</dd><dt>Closing script</dt><dd>${closingScripts[i]}</dd></dl></div></details>`;
  }).join('')}</section>`;
}

function conceptCards(items) {
  return `<div class="concept-grid">${items.map(([title, def, healthy, distorted, sentence, watch]) => `<article class="concept-card">
    <span class="tag teal">${title}</span>
    <p>${def}</p>
    <dl>
      <dt>Healthy version</dt><dd>${healthy}</dd>
      <dt>Distorted version</dt><dd>${distorted}</dd>
      <dt>Try this instead</dt><dd>${sentence}</dd>
      <dt>Watch for</dt><dd>${watch}</dd>
    </dl>
  </article>`).join('')}</div>`;
}

function lessonOneBody(s) {
  const index = sessions.findIndex((item) => item.file === s.file);
  return `<main id="main"><section><div class="wrap">${sessionHero(s, index)}
  <div class="quote"><strong>A verdict</strong> is an interpretation that has been treated as settled fact before it has been checked. The goal is not to distrust your feelings. The goal is to separate what you feel from the explanation that appeared with it.</div>
  <div class="grid two" style="margin-top:18px"><article class="card"><h2>Why This Matters</h2><p>External behavior may have contributed to the feeling. Someone may have lied, insulted, ignored an agreement, threatened, interrupted, or crossed a boundary. Separating the pieces helps you discuss that behavior accurately instead of treating the first explanation as the final truth.</p></article><article class="card accent"><h2>Anchor</h2><p>A feeling deserves care. An interpretation may be accurate, partly accurate, or inaccurate. Emotional intensity alone does not establish cause, motive, guilt, or responsibility.</p></article></div>
  <section class="lesson-block"><div class="section-head"><h2>The Five-Part Separator</h2><p><strong>Feeling → Interpretation → Claim → Request → Boundary or constraint.</strong> Use this sequence before the conversation becomes a verdict.</p><p>A feeling is internal experience. A claim is an assertion of cause, motive, character, or responsibility.</p></div><ol class="steps five-part"><li><strong>Feeling</strong><span>The internal experience being reported. “I feel lonely.”</span></li><li><strong>Interpretation</strong><span>The meaning being assigned. “I am reading the silence as distance.”</span></li><li><strong>Claim</strong><span>An assertion about motive, character, behavior, or responsibility. “You are ignoring me because you do not care.”</span></li><li><strong>Request</strong><span>The specific action being asked for. “Can we schedule ten minutes to reconnect tonight?”</span></li><li><strong>Boundary or Constraint</strong><span>The limit that must remain intact. “I can talk at 7:30, but not during my work block.”</span></li></ol></section>
  <section class="lesson-block"><div class="section-head"><h2>Clean Expression vs Verdict Expression</h2><p>The difference is not whether pain is real. The difference is whether the claim has been checked.</p></div><div class="comparison"><article class="card good-card"><span class="tag teal">Clean expression</span><p>“I feel disconnected. I am interpreting the quiet as rejection. Could you tell me what is happening on your side?”</p></article><article class="card warn-card"><span class="tag rose">Verdict expression</span><p>“I feel like you are ignoring me because I do not matter to you.”</p></article></div><p class="note">The second sentence contains a real feeling, but it also contains several unverified conclusions: the silence is intentional, the intention is rejection, the reason is lack of care, and the speaker’s worth has been judged.</p></section>
  <section class="lesson-block"><div class="grid two"><article class="card"><h2>Speaker Practice Line</h2><p>“I feel alone. I am interpreting the distance as meaning I do not matter, but I know that may not be the whole story. Can you tell me what is happening on your side? What I am asking for is a clear time to reconnect.”</p><p class="note"><strong>Mobile version:</strong> “I feel alone. I am reading the distance as rejection. Is that accurate? Can we choose a time to reconnect?”</p></article><article class="card"><h2>How to Respond Without Dismissing or Surrendering</h2><p>“I hear that you feel alone, and I care about that. I do not agree that my being unavailable means you do not matter. I can talk at 7:30 for twenty minutes.”</p><p class="note">This acknowledges the feeling, avoids a false confession, gives useful information, and names realistic capacity.</p></article></div></section>
  <section class="lesson-block"><div class="section-head"><h2>Watch For: Language That May Hide a Verdict</h2><p>These words are warning lights, not proof of bad intent. Slow the conversation down and return to exact behavior.</p></div><div class="grid"><article class="card"><h3>Always / Never</h3><p>May turn one event into a total character judgment.</p><p><strong>Ask:</strong> What specific examples are we discussing?</p></article><article class="card"><h3>Obviously</h3><p>May treat an interpretation as if no other explanation is possible.</p><p><strong>Ask:</strong> What did you observe, and what meaning did you assign to it?</p></article><article class="card"><h3>Admit</h3><p>May turn accountability into a demand for confession.</p><p><strong>Ask:</strong> What specific behavior are you asking me to own, and what interpretation are you asking me to agree with?</p></article></div></section>
  <section class="lesson-block"><div class="section-head"><h2>Try It</h2><p>Classify each statement, then check the answer.</p></div><div class="grid two"><article class="card"><ol><li>“I feel scared.”</li><li>“I feel like you do not care.”</li><li>“You made me feel unwanted.”</li><li>“Can we talk for ten minutes tonight?”</li><li>“I can talk tonight, but not while I am driving.”</li></ol></article><article class="card"><ol><li><strong>Feeling</strong></li><li><strong>Claim wrapped in feeling language</strong></li><li><strong>Causal claim</strong></li><li><strong>Request</strong></li><li><strong>Boundary or constraint</strong></li></ol></article></div></section>
  <section class="lesson-block"><div class="section-head"><h2>Real-Life Separation Exercise</h2><p>Complete the sequence before asking the other person to respond.</p></div><div class="worksheet mini-form"><p><strong>What I feel:</strong> I feel ______.</p><p><strong>What I observed:</strong> The specific event was ______.</p><p><strong>What I interpreted:</strong> I took that to mean ______.</p><p><strong>What I am claiming:</strong> I am currently assuming that you ______.</p><p><strong>What I need:</strong> I need ______.</p><p><strong>What I am requesting:</strong> Would you be willing to ______?</p><p><strong>What boundary or constraint exists:</strong> The limit that still needs to be respected is ______.</p></div></section>
  <section class="lesson-block"><div class="grid two"><article class="card accent"><h2>Important Limit</h2><p>Separating feeling from interpretation does not mean harmful behavior should be ignored. Threats, coercion, violence, stalking, intimidation, or other safety concerns should be assessed directly through behavior, evidence, and appropriate support. This tool is not for arguing someone out of a safety concern.</p><p>A person may be wrong about motive and still be right that a behavior caused harm.</p></article><article class="card"><h2>Two Things Can Be True</h2><p>You may be genuinely hurt, and your first explanation may still need checking.</p><p>The other person may have a valid boundary, and their delivery may still need repair.</p></article></div></section>
  <div class="quote"><strong>Reflection:</strong> Think of one recent statement that began with “I feel like...” What was the actual feeling? What interpretation followed it? What claim was being made? What clean request could replace the verdict?</div>
  <div class="quote" style="margin-top:18px"><strong>Bridge:</strong> When an interpretation is not separated from the feeling, reassurance may be asked to prove the interpretation wrong. If no answer is allowed to settle the fear, the conversation can move from connection into proof pressure.</div>
  <div class="pager"><a class="btn" href="./${s.prev[0]}">${s.prev[1]}</a><a class="btn primary" href="./${s.next[0]}">${s.next[1]}</a></div>${sessionActions(s)}</div></section></main>`;
}

page('index.html', 'Love Is Hard', `<section class="hero"><div class="hero-inner"><span class="eyebrow">Summit Learning | Communication and Pattern Literacy</span><h1>Love Is Hard: When Conversations Become Tests</h1><p class="lede">Learn to separate feelings from claims, care from proof, boundaries from abandonment, and repair from surrender.</p><div class="cta-row"><a class="btn primary" href="./lesson-01.html">Start the 8-session path</a><a class="btn" href="./tools.html">Use a tool now</a><a class="btn" href="./facilitator.html">Facilitate this</a></div></div></section>
<main id="main"><section><div class="wrap"><div class="section-head"><h2>Choose your starting point</h2><p>Use the program from the beginning, during a hard moment, or as a guided facilitation resource.</p></div><div class="grid three"><article class="card"><h3>I want to understand the full pattern</h3><p>Start the eight-session course from the beginning.</p><a class="inline-link" href="./lesson-01.html">Start Session 1</a></article><article class="card"><h3>I am in a difficult conversation now</h3><p>Use a short script, pause protocol, or boundary builder.</p><a class="inline-link" href="./tools.html">Open Immediate Tools</a></article><article class="card"><h3>I am teaching or facilitating this</h3><p>Use the session rhythm, limits, and safety lane.</p><a class="inline-link" href="./facilitator.html">Open Facilitator Center</a></article></div></div></section>
<section class="band"><div class="wrap"><div class="grid two"><article class="card accent"><h2>Safety Comes First</h2><p>This course addresses communication patterns. It is not a substitute for direct safety planning when there are threats, stalking, coercion, violence, or immediate danger.</p></article><article class="card progress-card" data-progress-summary><h2>Continue</h2><p>Start Session 1: Name the Pieces</p><a class="inline-link" href="./lesson-01.html">Begin the course</a></article></div></div></section>
<section><div class="wrap"><div class="section-head"><h2>By the end, you should be able to:</h2></div><ul class="outcome-list"><li>separate a feeling from an interpretation and claim;</li><li>identify a hidden premise inside a request;</li><li>recognize when reassurance becomes proof pressure;</li><li>restore the full sequence before judging a reaction;</li><li>create a boundary that includes a responsible return;</li><li>separate love, work, safety, and public reputation into proper lanes;</li><li>build a shared protocol for recurring conflict.</li></ul></div></section>
<section class="band"><div class="wrap"><div class="section-head"><h2>Eight-session path</h2><p>Name the pieces, hear clearly, expose hidden premises, recognize proof pressure, map escalation, protect boundaries, separate operations, and build an agreement.</p></div><div class="lesson-list">
${sessions.map((s, i) => `<a class="module session-card" data-session-card="${s.file}" href="./${s.file}" aria-label="Session ${i + 1}: ${s.name}"><div><span class="tag ${['teal','blue','copper','rose'][i % 4]}">${String(i + 1).padStart(2, '0')}</span><h3>Session ${i + 1}: ${s.name}</h3><p class="subtitle"><em>${s.title}</em></p></div><div><p>${s.lead}</p>${sessionMeta(s, i)}</div></a>`).join('')}
</div></div></section>
<section><div class="wrap"><div class="section-head"><h2>Borrowed War Loop Preview</h2><p>The model does not decide who is the villain. It helps identify where a conversation is in the cycle and what kind of interruption is needed.</p></div><ol class="loop-diagram"><li>Distress</li><li>Assigned Meaning</li><li>Proof Pressure</li><li>Boundary</li><li>Escalation</li><li>Crash</li><li>Repair or Restart</li></ol></div></section>
<section class="band"><div class="wrap"><div class="grid three"><article class="card"><h3>Immediate Tools</h3><p>Borrowed War Loop, pause protocol, operating agreement, and glossary terms in one public-safe toolkit.</p><a class="inline-link" href="./tools.html">Open tools</a></article><article class="card"><h3>Mobile Workbook</h3><p>Use structured fields for hidden claims, reaction sequence, boundary return, split apology, two truths, and repair gates.</p><a class="inline-link" href="./worksheet.html">Open workbook</a></article><article class="card"><h3>Audio Companion</h3><p>Tracks are grouped by learning role and used as prompts, not proof.</p><a class="inline-link" href="./songs.html">Open audio lenses</a></article></div></div></section>
<section><div class="wrap"><div class="section-head"><h2>Why this was built</h2><p>Love Is Hard grew from a long-form review of how affection, misunderstanding, reassurance, boundaries, and repair changed over time. The private material remains private. What is published here is the repeatable pattern: the part that may help someone recognize a difficult cycle earlier.</p></div><div class="grid two"><article class="card"><h3>Public Guardrails</h3><p>Evidence was reviewed and consolidated, but private messages, raw recordings outside the cleared player set, and evidence are intentionally withheld from the public version.</p><a class="inline-link" href="./guardrails.html">Read guardrails</a></article><article class="card"><h3>Facilitator Access</h3><p>Teach pattern literacy with explicit limits, safety lanes, and stop conditions.</p><a class="inline-link" href="./facilitator.html">Open facilitator center</a></article></div></div></section></main>`, 'Start');

for (const s of sessions) {
  if (s.file === 'lesson-01.html') {
    page(s.file, s.name, lessonOneBody(s));
    continue;
  }
  const index = sessions.findIndex((item) => item.file === s.file);
  page(s.file, s.name, `<main id="main"><section><div class="wrap">${sessionHero(s, index)}${conceptCards(s.concepts)}<div class="quote" style="margin-top:18px"><strong>Practice:</strong> ${s.practice}</div><div class="pager"><a class="btn" href="./${s.prev[0]}">${s.prev[1]}</a><a class="btn primary" href="./${s.next[0]}">${s.next[1]}</a></div>${sessionActions(s)}</div></section></main>`);
}

const groupedSongs = songs.reduce((acc, song) => {
  acc[song[0]] ||= [];
  acc[song[0]].push(song);
  return acc;
}, {});
page('songs.html', 'Audio Lenses', `<main id="main"><section><div class="wrap"><div class="section-head"><h1>Audio Lenses</h1><p>Every public track is connected to a lesson phase, a discussion prompt, and a release status. Use songs to examine patterns, not to prosecute people.</p></div>${Object.entries(groupedSongs).map(([group, list]) => `<section class="song-band"><h2>${group}</h2><div class="grid">${list.map(([, title, phase, note, prompt, link]) => `<article class="song" id="${slugForSong(title)}" data-kind="${group.toLowerCase().replaceAll(' ', '-')}"><div class="song-meta"><span class="pill">${phase}</span><span class="pill">Public player</span></div><h3>${title}</h3><p>${note}</p><p><strong>Prompt:</strong> ${prompt}</p><a class="inline-link" href="./${link}">Use with ${phase}</a></article>`).join('')}</div></section>`).join('')}<div class="pager"><a class="btn" href="./lesson-08.html">Back: Agreement</a><a class="btn primary" href="./player.html">Next: MP3 Player</a></div></div></section></main>`, 'Audio Companion');

page('player.html', 'MP3 Player', `<main id="main"><section class="band"><div class="wrap"><div class="section-head"><h1>MP3 Player</h1><p>Selected public tracks from the collection. The single player advances through the playlist and stops at the end.</p></div><section class="playlist-player" aria-label="Love Is Hard playlist"><div class="now-playing"><span class="tag teal">Now Playing</span><h2 id="currentTrack">${playlist[0][0]}</h2><p id="playerStatus">Ready to play the public-safe collection.</p><audio id="mainPlayer" preload="metadata" src="${playlist[0][1]}"></audio><div class="themed-player" aria-label="Audio controls"><button class="transport-button" id="playPause" type="button" aria-label="Play current track">Play</button><div class="track-controls"><input id="trackProgress" type="range" min="0" max="1000" value="0" aria-label="Track progress" /><div class="time-row"><span id="currentTime">0:00</span><span id="durationTime">0:00</span></div></div></div><div class="player-controls"><button class="tool" id="prevTrack" type="button">Previous</button><button class="tool" id="nextTrack" type="button">Next</button></div></div><ol class="playlist" id="playlist">${playlist.map(([title, src], i) => `<li><button type="button" class="${i === 0 ? 'active' : ''}" data-src="${src}" data-title="${title}" data-track="${slugForSong(title)}"><span aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${title}</button></li>`).join('')}</ol></section><div class="pager"><a class="btn" href="./songs.html">Back: Audio Lenses</a><a class="btn primary" href="./worksheet.html">Next: Workbook</a></div></div></section></main>`, 'Audio Companion');

page('worksheet.html', 'Workbook', `<main id="main"><section><div class="wrap"><div class="section-head"><h1>Mobile Workbook</h1><p>Notes save in this browser only. Export JSON when you want to move or archive your workbook.</p></div><div class="workbook-grid">
${[
  ['separator', 'Five-Part Separator', ['What did I feel?', 'What interpretation appeared?', 'What did I claim about the other person?', 'What did I actually need or request?', 'What boundary or capacity limit was present?']],
  ['hidden', 'Hidden-Claim Rewrite', ['Original statement', 'Hidden premise', 'Clean request']],
  ['sequence', 'Reaction Sequence Map', ['Before the reaction', 'During the reaction', 'After the reaction', 'What belongs to each person', 'What remains uncertain']],
  ['boundary', 'Boundary With Return Builder', ['Limit', 'Reason', 'Return time', 'Return conditions', 'Repair topic']],
  ['apology', 'Split Apology', ['What I did', 'What I regret', 'What I will change', 'What boundary remains']],
  ['truths', 'Two Things True', ['My pain is real, and...', 'Your limit is real, and...']],
  ['gate', 'Repair Gate', ['Recognition', 'Ownership', 'Changed behavior', 'Follow-through']],
].map(([id, title, prompts]) => `<article class="worksheet workbook-module" id="${id}" data-module="${id}"><h3>${title}</h3>${prompts.map((prompt, i) => `<label><span>${prompt}</span><textarea id="${id}_${i}" data-workbook-field="${id}" placeholder="${prompt}"></textarea></label>`).join('')}<p class="status" id="${id}_status">Empty</p></article>`).join('')}
</div><div class="tools sticky-tools"><button class="tool" id="saveNotes">Save Workbook</button><button class="tool" id="exportWorkbook">Export JSON</button><button class="tool" id="importWorkbook">Import JSON</button><button class="tool" id="clearNotes">Clear</button><button class="tool" onclick="window.print()">Print</button><input id="workbookImportFile" type="file" accept="application/json" hidden /></div><div class="status" id="noteStatus">Not saved yet.</div><div class="pager"><a class="btn" href="./player.html">Back: MP3 Player</a><a class="btn primary" href="./tools.html">Next: Tools</a></div></div></section></main>`, 'Workbook');

page('tools.html', 'Tools', `<main id="main"><section><div class="wrap"><div class="section-head"><h1>Tools</h1><p>Public-safe tools adapted from the Summit package: use them to slow the pattern, not to label a person.</p></div><div class="grid two"><article class="card" id="separator-tool"><h2>Five-Part Separator</h2><p>Use this before the conversation becomes a verdict: feeling, interpretation, claim, request, then boundary or constraint.</p><ol><li>Name the feeling.</li><li>Name the interpretation.</li><li>Separate the claim.</li><li>Ask for a specific next step.</li><li>State any real boundary or capacity limit.</li></ol></article><article class="card accent" id="loop-tool"><h2>Borrowed War Loop</h2><p>Pain may borrow an external battlefield. The goal is to identify the loop stage and interrupt it before the relationship becomes the war.</p><ol><li>Distress rises.</li><li>Meaning gets assigned outward.</li><li>Pressure seeks proof or confession.</li><li>A boundary appears.</li><li>Escalation captures the reaction.</li><li>Crash follows.</li><li>Repair-seeking can reconnect or restart the loop.</li></ol></article><article class="card" id="interruption-tool"><h2>Interruption Script</h2><p>I care about the pain. I am not joining the war. I can talk about one behavior, one need, and one next step for 20 minutes.</p><h3>Repair Script</h3><p>I own what I did. I will change ___. I will not confess to a motive or erase a boundary to end the pressure.</p></article></div><div class="grid three" style="margin-top:16px"><article class="card" id="pause-tool"><h3>Pause Protocol</h3><ol><li>Either person says PAUSE.</li><li>Stop for at least 20 minutes.</li><li>No chasing, texting, proving, or punishing.</li><li>Return with one agenda item and a 15-30 minute limit.</li><li>If still flooded, reschedule and protect sleep.</li></ol></article><article class="card" id="agreement-tool"><h3>Operating Agreement</h3><p>Build the agreement outside active conflict. Include shared principles, healthy support commitments, not-alloweds, a repair phrase, renegotiation script, progress log, and review date.</p></article><article class="card"><h3>Agreement Glossary</h3><p>Define terms before debating events. Needs, strategies, boundaries, proof demands, support, regulation, effort, and pause all need stable meanings.</p></article></div><section class="glossary-list" id="glossary-tool"><h2>Glossary Terms</h2><div class="grid two">${glossary.map(([term, def]) => `<article class="card"><h3>${term}</h3><p>${def}</p></article>`).join('')}</div></section><div class="pager"><a class="btn" href="./worksheet.html">Back: Workbook</a><a class="btn primary" href="./facilitator.html">Next: Facilitator</a></div></div></section></main>`, 'Tools');

page('facilitator.html', 'Facilitator', `<main id="main"><section><div class="wrap"><div class="section-head"><h1>Facilitator Center</h1><p>Teach pattern literacy without turning the framework into a verdict about a person.</p></div><div class="grid"><article class="card"><h3>Session Rhythm</h3><ol><li>Define the distinction.</li><li>Contrast healthy and distorted versions.</li><li>Rewrite one sentence.</li><li>Practice a pause or repair script.</li><li>Name what remains uncertain.</li></ol></article><article class="card"><h3>Facilitator Limits</h3><p>Do not diagnose, adjudicate private motives, solicit evidence dumps, or invite participants to weaponize the terms in the same week they learn them.</p></article><article class="card"><h3>Safety Lane</h3><p>Fear, coercion, threats, stalking, physical danger, and retaliation require direct safety planning or qualified support. Communication tools do not replace safety action.</p></article></div>${facilitatorPlans()}<div class="quote" style="margin-top:18px">End with a practical script, not a verdict.</div><div class="pager"><a class="btn" href="./tools.html">Back: Tools</a><a class="btn primary" href="./guardrails.html">Next: Guardrails</a></div></div></section></main>`, 'Facilitator');

page('guardrails.html', 'Guardrails', `<main id="main"><section><div class="wrap"><div class="section-head"><h1>Public Guardrails</h1><p>The teaching frame was reviewed and consolidated from a private source review, but the underlying messages, recordings outside the cleared player set, and evidence are intentionally withheld from the public version.</p></div><div class="grid"><article class="card"><h3>Evidence Was Reviewed, Not Published</h3><p>The public lesson is grounded in a private review and consolidation process. It does not publish messages, raw exports, ledgers, identifying dates, screenshots, or song lyrics as proof.</p></article><article class="card"><h3>How the Pattern Was Found</h3><p>The early material contained admiration, affection, mythology, and recognition. Later work recorded pressure around words, pace, proof, and uncertainty. The finding was not “one person was the villain”; it was that recognition can become proof pressure, proof can become confession pressure, and confession pressure can become war.</p></article><article class="card"><h3>What This Model Does Not Prove</h3><p>It does not prove motive, diagnose anyone, excuse harm, or erase accountability. It gives people language for sequence, pressure, boundaries, repair, and public/private separation.</p></article></div><div class="quote" style="margin-top:18px">Teach the pattern, not the person.</div><div class="section-head" style="margin-top:42px"><h2>Want more?</h2><p>Related AeroVista public projects continue the same work from different angles.</p></div><div class="grid"><a class="card" href="https://aerovista-us.github.io/seethetrial/" target="_blank" rel="noopener"><h3>See the Trial</h3><p>A public page for tracing how claims, stories, and evidence are weighed.</p></a><a class="card" href="https://aerovista-us.github.io/demons/" target="_blank" rel="noopener"><h3>Demons</h3><p>A companion project about difficult internal patterns without flattening people into villains.</p></a><a class="card" href="https://aerovista-us.github.io/Still_Counts/" target="_blank" rel="noopener"><h3>Still Counts</h3><p>A reminder that repair, harm, effort, and impact can all remain real at once.</p></a><a class="card" href="https://aerovista-us.github.io/loopbreaker/" target="_blank" rel="noopener"><h3>Loopbreaker</h3><p>A practical frame for noticing repeated cycles and choosing a different next move.</p></a><a class="card" href="https://aerovista-us.github.io/unheard/" target="_blank" rel="noopener"><h3>Unheard</h3><p>A public space for the cost of not being received, and for better listening.</p></a><a class="card" href="https://aerovista-us.github.io/forked/" target="_blank" rel="noopener"><h3>Forked</h3><p>A project about split paths, changed direction, and what still has to be carried with care.</p></a><a class="card" href="https://aerovista-us.github.io/revolution/" target="_blank" rel="noopener"><h3>Revolution</h3><p>A broader public page for change, refusal, and forward motion.</p></a><a class="card" href="https://aerovista-us.github.io/vday/" target="_blank" rel="noopener"><h3>Vday</h3><p>A related public page for love, pressure, memory, and meaning.</p></a></div><div class="pager"><a class="btn" href="./facilitator.html">Back: Facilitator</a><span></span></div></div></section></main>`, 'Guardrails');
