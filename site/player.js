const filterButtons = Array.from(document.querySelectorAll('.filter'));
const songs = Array.from(document.querySelectorAll('.song'));
const analyticsKey = 'love_is_hard_public_analytics_v1';
const feedbackKey = 'love_is_hard_public_feedback_v1';
const pageName = window.location.pathname.split('/').pop() || 'index.html';
const sessionOrder = [
  'lesson-01.html',
  'lesson-02.html',
  'lesson-03.html',
  'lesson-04.html',
  'lesson-05.html',
  'lesson-06.html',
  'lesson-07.html',
  'lesson-08.html',
];
const sessionNames = [
  'Name the Pieces',
  'Hear Clearly',
  'Hidden Premise',
  'Proof Pressure',
  'Escalation Map',
  'Boundaries',
  'Operations',
  'Agreement',
];

const loadJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const saveJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const trackEvent = (name, detail = {}) => {
  const data = loadJson(analyticsKey, { events: [], counts: {} });
  const event = {
    name,
    page: pageName,
    detail,
    at: new Date().toISOString(),
  };
  data.events.push(event);
  data.counts[name] = (data.counts[name] || 0) + 1;
  saveJson(analyticsKey, data);
};

if (pageName === 'index.html') trackEvent('homepage_visit');
if (pageName === 'worksheet.html') trackEvent('workbook_opened');
if (pageName === 'tools.html') trackEvent('tool_opened');
if (pageName === 'facilitator.html') trackEvent('facilitator_opened');
if (pageName === 'guardrails.html') trackEvent('guardrails_opened');

document.querySelectorAll('[data-analytics-event]').forEach((item) => {
  item.addEventListener('click', () => {
    trackEvent(item.dataset.analyticsEvent, { href: item.getAttribute('href') || '', label: item.textContent.trim() });
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    songs.forEach((song) => {
      const show = filter === 'all' || song.dataset.kind.split(' ').includes(filter);
      song.dataset.hidden = show ? 'false' : 'true';
    });
  });
});

const mainPlayer = document.getElementById('mainPlayer');
const playlistButtons = Array.from(document.querySelectorAll('#playlist button'));
const currentTrack = document.getElementById('currentTrack');
const playerStatus = document.getElementById('playerStatus');
const prevTrack = document.getElementById('prevTrack');
const nextTrack = document.getElementById('nextTrack');
const playPause = document.getElementById('playPause');
const trackProgress = document.getElementById('trackProgress');
const currentTime = document.getElementById('currentTime');
const durationTime = document.getElementById('durationTime');

if (mainPlayer && playlistButtons.length) {
  let currentIndex = 0;
  let isScrubbing = false;
  const startedTracks = new Set();
  const requestedTrack = new URLSearchParams(window.location.search).get('track');

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remaining}`;
  };

  const updatePlayButton = () => {
    if (!playPause) return;
    playPause.textContent = mainPlayer.paused ? 'Play' : 'Pause';
    playPause.setAttribute('aria-label', mainPlayer.paused ? 'Play current track' : 'Pause current track');
    playPause.classList.toggle('is-playing', !mainPlayer.paused);
  };

  const updateProgress = () => {
    const duration = mainPlayer.duration || 0;
    const time = mainPlayer.currentTime || 0;
    if (trackProgress && !isScrubbing) {
      trackProgress.value = duration ? Math.round((time / duration) * Number(trackProgress.max)) : 0;
    }
    if (currentTime) currentTime.textContent = formatTime(time);
    if (durationTime) durationTime.textContent = formatTime(duration);
  };

  const updateControls = () => {
    if (prevTrack) prevTrack.disabled = currentIndex === 0;
    if (nextTrack) nextTrack.disabled = currentIndex === playlistButtons.length - 1;
  };

  const setTrack = (index, shouldPlay = false) => {
    currentIndex = Math.max(0, Math.min(index, playlistButtons.length - 1));
    const track = playlistButtons[currentIndex];
    const title = track.dataset.title;

    playlistButtons.forEach((button, buttonIndex) => {
      button.classList.toggle('active', buttonIndex === currentIndex);
      button.setAttribute('aria-current', buttonIndex === currentIndex ? 'true' : 'false');
    });

    if (mainPlayer.getAttribute('src') !== track.dataset.src) {
      mainPlayer.src = track.dataset.src;
    }
    mainPlayer.currentTime = 0;

    if (currentTrack) currentTrack.textContent = title;
    if (playerStatus) playerStatus.textContent = `Track ${currentIndex + 1} of ${playlistButtons.length}`;
    updateControls();
    updateProgress();
    updatePlayButton();

    if (shouldPlay) {
      const playRequest = mainPlayer.play();
      if (playRequest) {
        playRequest.catch(() => {
          if (playerStatus) playerStatus.textContent = 'Press play to continue.';
        });
      }
    }
  };

  if (playPause) {
    playPause.addEventListener('click', () => {
      if (mainPlayer.paused) {
        const playRequest = mainPlayer.play();
        if (playRequest) {
          playRequest.catch(() => {
            if (playerStatus) playerStatus.textContent = 'Press play to continue.';
          });
        }
        return;
      }

      mainPlayer.pause();
    });
  }

  if (trackProgress) {
    trackProgress.addEventListener('input', () => {
      isScrubbing = true;
      const duration = mainPlayer.duration || 0;
      const nextTime = duration * (Number(trackProgress.value) / Number(trackProgress.max));
      if (currentTime) currentTime.textContent = formatTime(nextTime);
    });

    trackProgress.addEventListener('change', () => {
      const duration = mainPlayer.duration || 0;
      mainPlayer.currentTime = duration * (Number(trackProgress.value) / Number(trackProgress.max));
      isScrubbing = false;
      updateProgress();
    });
  }

  playlistButtons.forEach((button, index) => {
    button.addEventListener('click', () => setTrack(index, true));
  });

  if (prevTrack) {
    prevTrack.addEventListener('click', () => {
      setTrack(currentIndex - 1, true);
    });
  }

  if (nextTrack) {
    nextTrack.addEventListener('click', () => {
      setTrack(currentIndex + 1, true);
    });
  }

  mainPlayer.addEventListener('ended', () => {
    const current = playlistButtons[currentIndex];
    trackEvent('audio_completed', { track: current?.dataset.title || '' });
    if (currentIndex < playlistButtons.length - 1) {
      setTrack(currentIndex + 1, true);
      return;
    }

    if (playerStatus) playerStatus.textContent = 'Playlist complete.';
    updatePlayButton();
  });
  mainPlayer.addEventListener('loadedmetadata', updateProgress);
  mainPlayer.addEventListener('timeupdate', updateProgress);
  mainPlayer.addEventListener('play', () => {
    updatePlayButton();
    const current = playlistButtons[currentIndex];
    const key = current?.dataset.track || String(currentIndex);
    if (!startedTracks.has(key)) {
      startedTracks.add(key);
      trackEvent('audio_started', { track: current?.dataset.title || '' });
    }
  });
  mainPlayer.addEventListener('pause', updatePlayButton);

  const requestedIndex = requestedTrack ? playlistButtons.findIndex((button) => button.dataset.track === requestedTrack) : -1;
  setTrack(requestedIndex >= 0 ? requestedIndex : 0);
}

const narrativePlayer = document.getElementById('narrativePlayer');
const narrativeReadBtn = document.getElementById('narrativeReadBtn');
const narrativeProgress = document.getElementById('narrativeProgress');
const narrativeCurrentTime = document.getElementById('narrativeCurrentTime');
const narrativeDuration = document.getElementById('narrativeDuration');
const narrativeVolume = document.getElementById('narrativeVolume');

if (narrativePlayer) {
  let narrativeScrubbing = false;
  let narrativeStarted = false;

  const formatNarrativeTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remaining}`;
  };

  const updateNarrativePlayButton = () => {
    const paused = narrativePlayer.paused;
    if (narrativeReadBtn) {
      narrativeReadBtn.textContent = paused ? 'Read it to me' : 'Pause';
      narrativeReadBtn.setAttribute('aria-pressed', paused ? 'false' : 'true');
      narrativeReadBtn.setAttribute('aria-label', paused ? 'Read it to me' : 'Pause reading');
      narrativeReadBtn.classList.toggle('is-playing', !paused);
    }
  };

  const updateNarrativeProgress = () => {
    const duration = narrativePlayer.duration || 0;
    const time = narrativePlayer.currentTime || 0;
    if (narrativeProgress && !narrativeScrubbing) {
      narrativeProgress.value = duration ? Math.round((time / duration) * Number(narrativeProgress.max)) : 0;
    }
    if (narrativeCurrentTime) narrativeCurrentTime.textContent = formatNarrativeTime(time);
    if (narrativeDuration) narrativeDuration.textContent = formatNarrativeTime(duration);
  };

  const playNarrative = () => {
    const playRequest = narrativePlayer.play();
    if (playRequest) {
      playRequest.catch(() => {
        updateNarrativePlayButton();
      });
    }
  };

  const toggleNarrative = () => {
    if (narrativePlayer.paused) {
      playNarrative();
      return;
    }
    narrativePlayer.pause();
  };

  if (narrativeReadBtn) {
    narrativeReadBtn.addEventListener('click', () => {
      toggleNarrative();
    });
  }

  if (narrativeProgress) {
    narrativeProgress.addEventListener('input', () => {
      narrativeScrubbing = true;
      const duration = narrativePlayer.duration || 0;
      const nextTime = duration * (Number(narrativeProgress.value) / Number(narrativeProgress.max));
      if (narrativeCurrentTime) narrativeCurrentTime.textContent = formatNarrativeTime(nextTime);
    });

    narrativeProgress.addEventListener('change', () => {
      const duration = narrativePlayer.duration || 0;
      narrativePlayer.currentTime = duration * (Number(narrativeProgress.value) / Number(narrativeProgress.max));
      narrativeScrubbing = false;
      updateNarrativeProgress();
    });
  }

  if (narrativeVolume) {
    narrativePlayer.volume = Number(narrativeVolume.value) / 100;
    narrativeVolume.addEventListener('input', () => {
      narrativePlayer.volume = Number(narrativeVolume.value) / 100;
    });
  }

  narrativePlayer.addEventListener('loadedmetadata', updateNarrativeProgress);
  narrativePlayer.addEventListener('timeupdate', updateNarrativeProgress);
  narrativePlayer.addEventListener('play', () => {
    updateNarrativePlayButton();
    if (!narrativeStarted) {
      narrativeStarted = true;
      trackEvent('narrative_audio_started', { track: 'Private Understanding Narrative' });
    }
  });
  narrativePlayer.addEventListener('pause', updateNarrativePlayButton);
  narrativePlayer.addEventListener('ended', () => {
    trackEvent('narrative_audio_completed', { track: 'Private Understanding Narrative' });
    updateNarrativePlayButton();
    updateNarrativeProgress();
  });

  updateNarrativePlayButton();
  updateNarrativeProgress();
}

const progressKey = 'love_is_hard_public_progress_v1';
const sessionCards = Array.from(document.querySelectorAll('[data-session-card]'));
const progressSummary = document.querySelector('[data-progress-summary]');
const completeButtons = Array.from(document.querySelectorAll('.complete-session'));

const loadProgress = () => {
  return loadJson(progressKey, { completed: [], last: '' });
};

const saveProgress = (progress) => {
  saveJson(progressKey, progress);
};

const renderProgress = () => {
  const progress = loadProgress();
  const completed = new Set(progress.completed || []);

  sessionCards.forEach((card) => {
    const done = completed.has(card.dataset.sessionCard);
    card.classList.toggle('is-complete', done);
    card.setAttribute('data-status', done ? 'Complete' : 'Not complete');
  });

  completeButtons.forEach((button) => {
    const done = completed.has(button.dataset.session);
    button.classList.toggle('is-complete', done);
    button.textContent = done ? 'Session Complete' : 'Complete Session';
    button.setAttribute('aria-pressed', done ? 'true' : 'false');
  });

  if (progressSummary) {
    const nextSession = sessionOrder.find((file) => !completed.has(file)) || sessionOrder.at(-1);
    const nextIndex = sessionOrder.indexOf(nextSession);
    const lastIndex = progress.last ? sessionOrder.indexOf(progress.last) : -1;
    const continueFile = lastIndex >= 0 && !completed.has(progress.last) ? progress.last : nextSession;
    const continueIndex = sessionOrder.indexOf(continueFile);
    const count = completed.size;
    const percent = Math.round((count / sessionOrder.length) * 100);
    progressSummary.innerHTML = `<h2>${count ? `Continue Session ${continueIndex + 1}: ${sessionNames[continueIndex]}` : 'Continue'}</h2><p>${count} of ${sessionOrder.length} sessions complete (${percent}%).</p><a class="inline-link" href="./${continueFile}" data-analytics-event="continue_clicked">${count ? 'Continue learning' : 'Begin the course'}</a>`;
    const continueLink = progressSummary.querySelector('[data-analytics-event]');
    if (continueLink) {
      continueLink.addEventListener('click', () => {
        trackEvent('continue_clicked', { href: continueLink.getAttribute('href') || '' });
      });
    }
  }
};

if (completeButtons.length || sessionCards.length || progressSummary) {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (sessionOrder.includes(currentFile)) {
    const progress = loadProgress();
    progress.last = currentFile;
    saveProgress(progress);
  }

  completeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const progress = loadProgress();
      const completed = new Set(progress.completed || []);
      completed.add(button.dataset.session);
      progress.completed = Array.from(completed).sort((a, b) => sessionOrder.indexOf(a) - sessionOrder.indexOf(b));
      progress.last = button.dataset.session;
      saveProgress(progress);
      trackEvent('session_completed', { session: button.dataset.session });
      if (progress.completed.length === sessionOrder.length) trackEvent('full_course_completion');
      renderProgress();
    });
  });

  renderProgress();
}

const feedbackForms = Array.from(document.querySelectorAll('[data-feedback-form]'));
if (feedbackForms.length) {
  feedbackForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const entry = {
        session: form.dataset.session,
        rating: formData.get('rating'),
        note: formData.get('note') || '',
        at: new Date().toISOString(),
      };
      const data = loadJson(feedbackKey, []);
      data.push(entry);
      saveJson(feedbackKey, data);
      trackEvent('feedback_submitted', { session: entry.session, rating: entry.rating });
      const status = form.querySelector('[data-feedback-status]');
      if (status) status.textContent = 'Saved locally. Export pilot data from the Public Pilot page if you want to share it.';
      form.reset();
    });
  });
}

const renderPilotDashboard = () => {
  const dashboard = document.querySelector('[data-pilot-dashboard]');
  if (!dashboard) return;
  const analytics = loadJson(analyticsKey, { events: [], counts: {} });
  const progress = loadProgress();
  const feedback = loadJson(feedbackKey, []);
  const counts = analytics.counts || {};

  document.querySelectorAll('[data-metric]').forEach((item) => {
    const metric = item.dataset.metric;
    item.textContent = metric === 'feedback_submitted' ? feedback.length : counts[metric] || 0;
  });

  const sessionDashboard = document.querySelector('[data-session-dashboard]');
  if (sessionDashboard) {
    const completed = new Set(progress.completed || []);
    sessionDashboard.innerHTML = sessionOrder.map((file, index) => {
      const status = completed.has(file) ? 'Complete' : 'Not complete';
      return `<li><strong>Session ${index + 1}: ${sessionNames[index]}</strong><span>${status}</span></li>`;
    }).join('');
  }
};

const exportPilotData = document.getElementById('exportPilotData');
const clearPilotData = document.getElementById('clearPilotData');
const pilotStatus = document.getElementById('pilotStatus');
if (exportPilotData) {
  exportPilotData.addEventListener('click', () => {
    const payload = {
      release: 'Love Is Hard — Summit Learning Public Pilot v1.0',
      exportedAt: new Date().toISOString(),
      analytics: loadJson(analyticsKey, { events: [], counts: {} }),
      feedback: loadJson(feedbackKey, []),
      progress: loadProgress(),
      workbook: loadJson('love_is_hard_public_workbook_v1', {}),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'love-is-hard-public-pilot.json';
    link.click();
    URL.revokeObjectURL(link.href);
    if (pilotStatus) pilotStatus.textContent = 'Exported pilot JSON.';
  });
}
if (clearPilotData) {
  clearPilotData.addEventListener('click', () => {
    localStorage.removeItem(analyticsKey);
    localStorage.removeItem(feedbackKey);
    localStorage.removeItem(progressKey);
    renderPilotDashboard();
    renderProgress();
    if (pilotStatus) pilotStatus.textContent = 'Cleared local pilot analytics, feedback, and progress.';
  });
}
renderPilotDashboard();

const status = document.getElementById('noteStatus');
const workbookFields = Array.from(document.querySelectorAll('[data-workbook-field]'));
if (workbookFields.length && status) {
  const key = 'love_is_hard_public_workbook_v1';
  const save = document.getElementById('saveNotes');
  const clear = document.getElementById('clearNotes');
  const exportButton = document.getElementById('exportWorkbook');
  const importButton = document.getElementById('importWorkbook');
  const importFile = document.getElementById('workbookImportFile');

  const setModuleStatus = () => {
    const modules = Array.from(document.querySelectorAll('.workbook-module'));
    modules.forEach((module) => {
      const fields = Array.from(module.querySelectorAll('[data-workbook-field]'));
      const completed = fields.filter((field) => field.value.trim()).length;
      const label = module.querySelector('.status');
      if (label) label.textContent = `${completed} of ${fields.length} fields complete`;
    });
  };

  const getWorkbook = () => {
    const data = {};
    workbookFields.forEach((field) => {
      data[field.id] = field.value;
    });
    data.__savedAt = new Date().toISOString();
    return data;
  };

  const applyWorkbook = (data) => {
    workbookFields.forEach((field) => {
      if (typeof data[field.id] === 'string') field.value = data[field.id];
    });
    setModuleStatus();
    status.textContent = data.__savedAt ? `Loaded saved workbook from ${new Date(data.__savedAt).toLocaleString()}.` : 'Loaded workbook.';
  };

  const saveWorkbook = () => {
    const data = getWorkbook();
    localStorage.setItem(key, JSON.stringify(data));
    setModuleStatus();
    status.textContent = `Saved locally at ${new Date(data.__savedAt).toLocaleString()}.`;
    return data;
  };

  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      applyWorkbook(JSON.parse(saved));
    } catch {
      status.textContent = 'Saved workbook could not be loaded.';
    }
  } else {
    setModuleStatus();
  }

  workbookFields.forEach((field) => {
    field.addEventListener('input', () => {
      setModuleStatus();
    });
  });

  if (save) save.addEventListener('click', saveWorkbook);

  if (clear) clear.addEventListener('click', () => {
    workbookFields.forEach((field) => {
      field.value = '';
    });
    localStorage.removeItem(key);
    setModuleStatus();
    status.textContent = 'Cleared.';
  });

  if (exportButton) {
    exportButton.addEventListener('click', () => {
      const data = saveWorkbook();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'love-is-hard-workbook.json';
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }

  if (importButton && importFile) {
    importButton.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', () => {
      const file = importFile.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        try {
          const data = JSON.parse(reader.result);
          applyWorkbook(data);
          saveWorkbook();
        } catch {
          status.textContent = 'Import failed. Choose a valid workbook JSON file.';
        }
      });
      reader.readAsText(file);
    });
  }
}
