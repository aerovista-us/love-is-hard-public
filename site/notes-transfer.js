// Only Love Is Hard notes are eligible. Nothing is sent over the network.
export function isNotesKey(key) {
  return /^(?:love_is_hard_public_(?:analytics|feedback|progress|workbook)_v1|lih-(?:anticipatory-interpretation|communication-guide|understanding-session)-v1|lih-interactive-lesson-0[1-8]\.html|lih-lab-v1-[1-8])$/.test(key);
}

export function createBackup(storage) {
  const entries = {};
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (isNotesKey(key)) entries[key] = storage.getItem(key);
  }
  return { format: 'love-is-hard-local-notes', version: 1, entries };
}

export function validateBackup(value) {
  if (value?.format !== 'love-is-hard-local-notes' || value.version !== 1
      || !value.entries || typeof value.entries !== 'object' || Array.isArray(value.entries)) {
    throw new Error('Choose a Love Is Hard notes backup.');
  }
  const entries = Object.entries(value.entries);
  if (entries.length > 30) throw new Error('This backup contains too many note groups.');
  for (const [key, raw] of entries) {
    if (!isNotesKey(key) || typeof raw !== 'string' || raw.length > 1_000_000) {
      throw new Error('This backup contains an unsupported note group.');
    }
    JSON.parse(raw);
  }
  return entries;
}

export function restoreBackup(storage, backup) {
  const entries = validateBackup(backup);
  const previous = entries.map(([key]) => [key, storage.getItem(key)]);
  try {
    for (const [key, raw] of entries) storage.setItem(key, raw);
  } catch (error) {
    for (const [key, raw] of previous) {
      try { raw === null ? storage.removeItem(key) : storage.setItem(key, raw); } catch {}
    }
    throw error;
  }
  return entries.length;
}

export function downloadBackup(storage) {
  const backup = createBackup(storage);
  validateBackup(backup);
  const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'love-is-hard-local-notes.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return Object.keys(backup.entries).length;
}
