import { writeFileSync } from 'node:fs';

const siteUrl = 'https://aerovista-us.github.io/love-is-hard-public/';
const description = 'A public-safe teaching collection about repair, listening, and emotional complexity.';

const nav = [
  ['index.html', 'Start', 'Start'],
  ['lesson-01.html', 'Session 1', 'Name the Pieces'],
  ['lesson-02.html', 'Session 2', 'Hear Clearly'],
  ['lesson-03.html', 'Session 3', 'Hidden Premise'],
  ['lesson-04.html', 'Session 4', 'Proof Pressure'],
  ['lesson-05.html', 'Session 5', 'Escalation Map'],
  ['lesson-06.html', 'Session 6', 'Boundaries'],
  ['lesson-07.html', 'Session 7', 'Operations'],
  ['lesson-08.html', 'Session 8', 'Agreement'],
  ['songs.html', 'Audio', 'Audio Lenses'],
  ['player.html', 'Player', 'MP3 Player'],
  ['worksheet.html', 'Workbook', 'Workbook'],
  ['tools.html', 'Tools', 'Tools'],
  ['facilitator.html', 'Facilitator', 'Facilitator'],
  ['guardrails.html', 'Guardrails', 'Guardrails'],
];

const sessions = [
  {
    file: 'lesson-01.html',
    short: 'Session 1',
    title: 'Name the Pieces',
    lead: 'Separate feeling, interpretation, claim, request, and boundary before a conversation turns into a verdict.',
    tag: 'Precision',
    concepts: [
      ['Feeling vs Claim', 'A feeling is inner data. A claim assigns cause, motive, or responsibility outside you.', 'I feel scared and need clarity.', 'You obviously do not care.', 'I feel ___, and the story I am telling myself is ___. Can we check it?', 'Watch for always, never, obviously, and if you cared.'],
      ['Interpretation Check', 'The first explanation may be compelling without being complete.', 'I am noticing a fear story and want to verify it.', 'My fear is proof that your motive is bad.', 'The meaning I made was ___. Is that what you meant?', 'Watch for mind-reading and instant certainty.'],
      ['Clean Request', 'A request names what would help without making the other person confess to a hidden charge.', 'Can we talk for 20 minutes at 6:30?', 'Prove I matter right now or this means everything.', 'What I am asking for is ___. Is that available?', 'Watch for requests that require surrendering reality.'],
    ],
    practice: 'Rewrite one loaded sentence into five parts: what I felt, what I interpreted, what I claimed, what I needed, and what boundary or capacity limit was present.',
    next: ['lesson-02.html', 'Next: Hear Clearly'],
    prev: ['index.html', 'Back: Start'],
  },
  {
    file: 'lesson-02.html',
    short: 'Session 2',
    title: 'Hear Without Surrendering Reality',
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
    title: 'Find the Hidden Premise',
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
    title: 'Recognize Proof Pressure',
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
    title: 'Map the Escalation',
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
    title: 'Protect Boundaries and Repair Delivery',
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
    title: 'Separate Love From Operations',
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
    title: 'Build an Operating Agreement',
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

function head(title) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} | Love Is Hard</title>
  <meta name="description" content="Public-safe Summit Learning lesson set for Love Is Hard." />
  <link rel="icon" type="image/svg+xml" href="./assets/favicon.svg" />
  <meta name="theme-color" content="#17202b" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Love Is Hard" />
  <meta property="og:title" content="Love Is Hard" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${siteUrl}assets/og-image.png" />
  <meta property="og:image:width" content="1731" />
  <meta property="og:image:height" content="909" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Love Is Hard" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${siteUrl}assets/og-image.png" />
  <link rel="stylesheet" href="./styles.css" />
</head>`;
}

function header(file, progressLabel = '') {
  const progress = sessions.findIndex((s) => s.file === file) + 1;
  const label = progress ? `Session ${progress} of 8` : progressLabel;
  const width = progress ? Math.round((progress / 8) * 100) : 0;
  const links = nav.map(([href, label]) => `<a href="./${href}" class="${href === file ? 'active' : ''}">${label}</a>`).join('');
  return `<body>
  <header class="site-header">
    <div class="nav-shell">
      <div class="brand-row"><a class="brand" href="./index.html">Love Is Hard</a><span class="progress-label">${label}</span></div>
      <nav class="nav-links" aria-label="Site navigation">${links}</nav>
      ${progress ? `<div class="progress-bar" aria-hidden="true"><span style="width:${width}%"></span></div>` : ''}
    </div>
  </header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap"><span>Love Is Hard | Public-safe collection consolidation</span><span>Teach the pattern, not the person.</span></div></footer>
  <script src="./player.js"></script>
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

page('index.html', 'Love Is Hard', `<section class="hero"><div class="hero-inner"><span class="eyebrow">Summit Learning | Public-safe case study</span><h1>Love Is Hard: When Conversations Become Tests</h1><p class="lede">Learn to separate feelings from claims, care from proof, boundaries from abandonment, and repair from surrender.</p><div class="cta-row"><a class="btn primary" href="./lesson-01.html">Start the 8-session path</a><a class="btn" href="./tools.html">Use a tool now</a><a class="btn" href="./player.html">Listen to audio</a></div></div></section>
<main><section><div class="wrap"><div class="section-head"><h2>Learn</h2><p>Love Is Hard is a Summit Learning program for recognizing when ordinary needs for reassurance, safety, understanding, or repair begin turning into tests, verdicts, pressure, or war.</p></div><div class="lesson-list">
${sessions.map((s, i) => `<a class="module" href="./${s.file}"><div><span class="tag ${['teal','blue','copper','rose'][i % 4]}">${String(i + 1).padStart(2, '0')}</span><h3>${s.title}</h3></div><p>${s.lead}</p></a>`).join('')}
</div></div></section><section class="band"><div class="wrap"><div class="grid three"><article class="card"><h3>Audio Companion</h3><p>Tracks are grouped by learning role and used as prompts, not proof.</p><a class="inline-link" href="./songs.html">Open audio lenses</a></article><article class="card"><h3>Workbook</h3><p>Use structured fields for hidden claims, reaction sequence, boundary return, split apology, two truths, and repair gates.</p><a class="inline-link" href="./worksheet.html">Open workbook</a></article><article class="card"><h3>Tools</h3><p>Borrowed War Loop, pause protocol, operating agreement, and glossary terms in one public-safe toolkit.</p><a class="inline-link" href="./tools.html">Open tools</a></article></div></div></section></main>`, 'Start');

for (const s of sessions) {
  page(s.file, s.title, `<main><section><div class="wrap"><div class="section-head"><span class="tag copper">${s.tag}</span><h1>${s.title}</h1><p>${s.lead}</p></div>${conceptCards(s.concepts)}<div class="quote" style="margin-top:18px"><strong>Practice:</strong> ${s.practice}</div><div class="pager"><a class="btn" href="./${s.prev[0]}">${s.prev[1]}</a><a class="btn primary" href="./${s.next[0]}">${s.next[1]}</a></div></div></section></main>`);
}

const groupedSongs = songs.reduce((acc, song) => {
  acc[song[0]] ||= [];
  acc[song[0]].push(song);
  return acc;
}, {});
page('songs.html', 'Audio Lenses', `<main><section><div class="wrap"><div class="section-head"><h1>Audio Lenses</h1><p>Every public track is connected to a lesson phase, a discussion prompt, and a release status. Use songs to examine patterns, not to prosecute people.</p></div>${Object.entries(groupedSongs).map(([group, list]) => `<section class="song-band"><h2>${group}</h2><div class="grid">${list.map(([, title, phase, note, prompt, link]) => `<article class="song" data-kind="${group.toLowerCase().replaceAll(' ', '-')}"><div class="song-meta"><span class="pill">${phase}</span><span class="pill">Public player</span></div><h3>${title}</h3><p>${note}</p><p><strong>Prompt:</strong> ${prompt}</p><a class="inline-link" href="./${link}">Use with ${phase}</a></article>`).join('')}</div></section>`).join('')}<div class="pager"><a class="btn" href="./lesson-08.html">Back: Agreement</a><a class="btn primary" href="./player.html">Next: MP3 Player</a></div></div></section></main>`, 'Audio Companion');

page('player.html', 'MP3 Player', `<main><section class="band"><div class="wrap"><div class="section-head"><h1>MP3 Player</h1><p>Selected public tracks from the collection. The single player advances through the playlist and stops at the end.</p></div><section class="playlist-player" aria-label="Love Is Hard playlist"><div class="now-playing"><span class="tag teal">Now Playing</span><h2 id="currentTrack">${playlist[0][0]}</h2><p id="playerStatus">Ready to play the public-safe collection.</p><audio id="mainPlayer" preload="metadata" src="${playlist[0][1]}"></audio><div class="themed-player" aria-label="Audio controls"><button class="transport-button" id="playPause" type="button" aria-label="Play current track">Play</button><div class="track-controls"><input id="trackProgress" type="range" min="0" max="1000" value="0" aria-label="Track progress" /><div class="time-row"><span id="currentTime">0:00</span><span id="durationTime">0:00</span></div></div></div><div class="player-controls"><button class="tool" id="prevTrack" type="button">Previous</button><button class="tool" id="nextTrack" type="button">Next</button></div></div><ol class="playlist" id="playlist">${playlist.map(([title, src], i) => `<li><button type="button" class="${i === 0 ? 'active' : ''}" data-src="${src}" data-title="${title}"><span>${String(i + 1).padStart(2, '0')}</span>${title}</button></li>`).join('')}</ol></section><div class="pager"><a class="btn" href="./songs.html">Back: Audio Lenses</a><a class="btn primary" href="./worksheet.html">Next: Workbook</a></div></div></section></main>`, 'Audio Companion');

page('worksheet.html', 'Workbook', `<main><section><div class="wrap"><div class="section-head"><h1>Mobile Workbook</h1><p>Notes save in this browser only. Export JSON when you want to move or archive your workbook.</p></div><div class="workbook-grid">
${[
  ['separator', 'Five-Part Separator', ['What did I feel?', 'What interpretation appeared?', 'What did I claim about the other person?', 'What did I actually need or request?', 'What boundary or capacity limit was present?']],
  ['hidden', 'Hidden-Claim Rewrite', ['Original statement', 'Hidden premise', 'Clean request']],
  ['sequence', 'Reaction Sequence Map', ['Before the reaction', 'During the reaction', 'After the reaction', 'What belongs to each person', 'What remains uncertain']],
  ['boundary', 'Boundary With Return Builder', ['Limit', 'Reason', 'Return time', 'Return conditions', 'Repair topic']],
  ['apology', 'Split Apology', ['What I did', 'What I regret', 'What I will change', 'What boundary remains']],
  ['truths', 'Two Things True', ['My pain is real, and...', 'Your limit is real, and...']],
  ['gate', 'Repair Gate', ['Recognition', 'Ownership', 'Changed behavior', 'Follow-through']],
].map(([id, title, prompts]) => `<article class="worksheet workbook-module" data-module="${id}"><h3>${title}</h3>${prompts.map((prompt, i) => `<label><span>${prompt}</span><textarea id="${id}_${i}" data-workbook-field="${id}" placeholder="${prompt}"></textarea></label>`).join('')}<p class="status" id="${id}_status">Empty</p></article>`).join('')}
</div><div class="tools sticky-tools"><button class="tool" id="saveNotes">Save Workbook</button><button class="tool" id="exportWorkbook">Export JSON</button><button class="tool" id="importWorkbook">Import JSON</button><button class="tool" id="clearNotes">Clear</button><button class="tool" onclick="window.print()">Print</button><input id="workbookImportFile" type="file" accept="application/json" hidden /></div><div class="status" id="noteStatus">Not saved yet.</div><div class="pager"><a class="btn" href="./player.html">Back: MP3 Player</a><a class="btn primary" href="./tools.html">Next: Tools</a></div></div></section></main>`, 'Workbook');

page('tools.html', 'Tools', `<main><section><div class="wrap"><div class="section-head"><h1>Tools</h1><p>Public-safe tools adapted from the Summit package: use them to slow the pattern, not to label a person.</p></div><div class="grid two"><article class="card accent"><h2>Borrowed War Loop</h2><p>Pain may borrow an external battlefield. The goal is to identify the loop stage and interrupt it before the relationship becomes the war.</p><ol><li>Distress rises.</li><li>Meaning gets assigned outward.</li><li>Pressure seeks proof or confession.</li><li>A boundary appears.</li><li>Escalation captures the reaction.</li><li>Crash follows.</li><li>Repair-seeking can reconnect or restart the loop.</li></ol></article><article class="card"><h2>Interruption Script</h2><p>I care about the pain. I am not joining the war. I can talk about one behavior, one need, and one next step for 20 minutes.</p><h3>Repair Script</h3><p>I own what I did. I will change ___. I will not confess to a motive or erase a boundary to end the pressure.</p></article></div><div class="grid three" style="margin-top:16px"><article class="card"><h3>Pause Protocol</h3><ol><li>Either person says PAUSE.</li><li>Stop for at least 20 minutes.</li><li>No chasing, texting, proving, or punishing.</li><li>Return with one agenda item and a 15-30 minute limit.</li><li>If still flooded, reschedule and protect sleep.</li></ol></article><article class="card"><h3>Operating Agreement</h3><p>Build the agreement outside active conflict. Include shared principles, healthy support commitments, not-alloweds, a repair phrase, renegotiation script, progress log, and review date.</p></article><article class="card"><h3>Agreement Glossary</h3><p>Define terms before debating events. Needs, strategies, boundaries, proof demands, support, regulation, effort, and pause all need stable meanings.</p></article></div><section class="glossary-list"><h2>Glossary Terms</h2><div class="grid two">${glossary.map(([term, def]) => `<article class="card"><h3>${term}</h3><p>${def}</p></article>`).join('')}</div></section><div class="pager"><a class="btn" href="./worksheet.html">Back: Workbook</a><a class="btn primary" href="./facilitator.html">Next: Facilitator</a></div></div></section></main>`, 'Tools');

page('facilitator.html', 'Facilitator', `<main><section><div class="wrap"><div class="section-head"><h1>Facilitator Center</h1><p>Teach pattern literacy without turning the framework into a verdict about a person.</p></div><div class="grid"><article class="card"><h3>Session Rhythm</h3><ol><li>Define the distinction.</li><li>Contrast healthy and distorted versions.</li><li>Rewrite one sentence.</li><li>Practice a pause or repair script.</li><li>Name what remains uncertain.</li></ol></article><article class="card"><h3>Facilitator Limits</h3><p>Do not diagnose, adjudicate private motives, solicit evidence dumps, or invite participants to weaponize the terms in the same week they learn them.</p></article><article class="card"><h3>Safety Lane</h3><p>Fear, coercion, threats, stalking, physical danger, and retaliation require direct safety planning or qualified support. Communication tools do not replace safety action.</p></article></div><div class="quote" style="margin-top:18px">End with a practical script, not a verdict.</div><div class="pager"><a class="btn" href="./tools.html">Back: Tools</a><a class="btn primary" href="./guardrails.html">Next: Guardrails</a></div></div></section></main>`, 'Facilitator');

page('guardrails.html', 'Guardrails', `<main><section><div class="wrap"><div class="section-head"><h1>Public Guardrails</h1><p>The teaching frame was reviewed and consolidated from a private source review, but the underlying messages, recordings outside the cleared player set, and evidence are intentionally withheld from the public version.</p></div><div class="grid"><article class="card"><h3>Evidence Was Reviewed, Not Published</h3><p>The public lesson is grounded in a private review and consolidation process. It does not publish messages, raw exports, ledgers, identifying dates, screenshots, or song lyrics as proof.</p></article><article class="card"><h3>How the Pattern Was Found</h3><p>The early material contained admiration, affection, mythology, and recognition. Later work recorded pressure around words, pace, proof, and uncertainty. The finding was not “one person was the villain”; it was that recognition can become proof pressure, proof can become confession pressure, and confession pressure can become war.</p></article><article class="card"><h3>What This Model Does Not Prove</h3><p>It does not prove motive, diagnose anyone, excuse harm, or erase accountability. It gives people language for sequence, pressure, boundaries, repair, and public/private separation.</p></article></div><div class="quote" style="margin-top:18px">Teach the pattern, not the person.</div><div class="section-head" style="margin-top:42px"><h2>Want more?</h2><p>Related AeroVista public projects continue the same work from different angles.</p></div><div class="grid"><a class="card" href="https://aerovista-us.github.io/seethetrial/" target="_blank" rel="noopener"><h3>See the Trial</h3><p>A public page for tracing how claims, stories, and evidence are weighed.</p></a><a class="card" href="https://aerovista-us.github.io/demons/" target="_blank" rel="noopener"><h3>Demons</h3><p>A companion project about difficult internal patterns without flattening people into villains.</p></a><a class="card" href="https://aerovista-us.github.io/Still_Counts/" target="_blank" rel="noopener"><h3>Still Counts</h3><p>A reminder that repair, harm, effort, and impact can all remain real at once.</p></a><a class="card" href="https://aerovista-us.github.io/loopbreaker/" target="_blank" rel="noopener"><h3>Loopbreaker</h3><p>A practical frame for noticing repeated cycles and choosing a different next move.</p></a><a class="card" href="https://aerovista-us.github.io/unheard/" target="_blank" rel="noopener"><h3>Unheard</h3><p>A public space for the cost of not being received, and for better listening.</p></a><a class="card" href="https://aerovista-us.github.io/forked/" target="_blank" rel="noopener"><h3>Forked</h3><p>A project about split paths, changed direction, and what still has to be carried with care.</p></a><a class="card" href="https://aerovista-us.github.io/revolution/" target="_blank" rel="noopener"><h3>Revolution</h3><p>A broader public page for change, refusal, and forward motion.</p></a><a class="card" href="https://aerovista-us.github.io/vday/" target="_blank" rel="noopener"><h3>Vday</h3><p>A related public page for love, pressure, memory, and meaning.</p></a></div><div class="pager"><a class="btn" href="./facilitator.html">Back: Facilitator</a><span></span></div></div></section></main>`, 'Guardrails');
