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

if (mainPlayer && playlistButtons.length) {
  let currentIndex = 0;

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

    if (currentTrack) currentTrack.textContent = title;
    if (playerStatus) playerStatus.textContent = `Track ${currentIndex + 1} of ${playlistButtons.length}`;
    updateControls();

    if (shouldPlay) {
      const playRequest = mainPlayer.play();
      if (playRequest) {
        playRequest.catch(() => {
          if (playerStatus) playerStatus.textContent = 'Press play to continue.';
        });
      }
    }
  };

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
  });

  setTrack(0);
}

const notes = document.getElementById('notes');
const status = document.getElementById('noteStatus');
if (notes && status) {
  const key = 'love_is_hard_public_notes_v3';
  const saved = localStorage.getItem(key);
  if (saved) {
    notes.value = saved;
    status.textContent = 'Loaded saved notes.';
  }
  const save = document.getElementById('saveNotes');
  const clear = document.getElementById('clearNotes');
  if (save) save.addEventListener('click', () => {
    localStorage.setItem(key, notes.value);
    status.textContent = `Saved locally at ${new Date().toLocaleString()}.`;
  });
  if (clear) clear.addEventListener('click', () => {
    notes.value = '';
    localStorage.removeItem(key);
    status.textContent = 'Cleared.';
  });
}
