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

document.querySelectorAll('audio').forEach((audio) => {
  audio.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach((other) => {
      if (other !== audio) other.pause();
    });
  });
});

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
