const filterButtons = Array.from(document.querySelectorAll('.filter'));
const songs = Array.from(document.querySelectorAll('.song'));
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
    if (currentIndex < playlistButtons.length - 1) {
      setTrack(currentIndex + 1, true);
      return;
    }

    if (playerStatus) playerStatus.textContent = 'Playlist complete.';
    updatePlayButton();
  });
  mainPlayer.addEventListener('loadedmetadata', updateProgress);
  mainPlayer.addEventListener('timeupdate', updateProgress);
  mainPlayer.addEventListener('play', updatePlayButton);
  mainPlayer.addEventListener('pause', updatePlayButton);

  const requestedIndex = requestedTrack ? playlistButtons.findIndex((button) => button.dataset.track === requestedTrack) : -1;
  setTrack(requestedIndex >= 0 ? requestedIndex : 0);
}

const progressKey = 'love_is_hard_public_progress_v1';
const sessionCards = Array.from(document.querySelectorAll('[data-session-card]'));
const progressSummary = document.querySelector('[data-progress-summary]');
const completeButtons = Array.from(document.querySelectorAll('.complete-session'));
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

const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(progressKey)) || { completed: [], last: '' };
  } catch {
    return { completed: [], last: '' };
  }
};

const saveProgress = (progress) => {
  localStorage.setItem(progressKey, JSON.stringify(progress));
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
    progressSummary.innerHTML = `<h2>${count ? `Continue Session ${continueIndex + 1}: ${sessionNames[continueIndex]}` : 'Continue'}</h2><p>${count} of ${sessionOrder.length} sessions complete (${percent}%).</p><a class="inline-link" href="./${continueFile}">${count ? 'Continue learning' : 'Begin the course'}</a>`;
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
      renderProgress();
    });
  });

  renderProgress();
}

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
