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

  setTrack(0);
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
