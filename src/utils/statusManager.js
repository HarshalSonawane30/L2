// Simple demo status manager using localStorage
// Stores statuses under key 'll_user_statuses' as JSON mapping id -> { online: bool, lastSeen: timestamp }

const STORAGE_KEY = 'll_user_statuses';

function _read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('statusManager: read error', e);
    return {};
  }
}

function _write(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.error('statusManager: write error', e);
  }
}

export function initStatuses(conversations = []) {
  const existing = _read();
  let changed = false;
  conversations.forEach((conv) => {
    if (!existing[conv.id]) {
      const online = Math.random() > 0.5;
      existing[conv.id] = {
        online,
        lastSeen: online ? Date.now() : Date.now() - (Math.floor(Math.random() * 60) + 5) * 60 * 1000
      };
      changed = true;
    }
  });
  if (changed) _write(existing);
  return existing;
}

export function getStatuses() {
  return _read();
}

export function getStatus(id) {
  const s = _read();
  return s[id] || { online: false, lastSeen: null };
}

export function setOnline(id, online = true) {
  const s = _read();
  s[id] = s[id] || {};
  s[id].online = online;
  // When going offline, record lastSeen timestamp. When online, keep lastSeen as-is or update if missing.
  if (!online) {
    s[id].lastSeen = Date.now();
  } else if (!s[id].lastSeen) {
    s[id].lastSeen = Date.now();
  }
  _write(s);
  return s[id];
}

export function updateLastSeen(id) {
  const s = _read();
  s[id] = s[id] || {};
  s[id].lastSeen = Date.now();
  s[id].online = false;
  _write(s);
  return s[id];
}

// For demo: toggle random conversation statuses
export function randomToggle(conversationIds = []) {
  const s = _read();
  conversationIds.forEach(id => {
    if (!s[id]) s[id] = { online: false, lastSeen: Date.now() };
    // 30% chance to flip status
    if (Math.random() < 0.3) {
      s[id].online = !s[id].online;
      if (!s[id].online) s[id].lastSeen = Date.now();
      else s[id].lastSeen = Date.now();
    }
  });
  _write(s);
  return s;
}

export default {
  initStatuses,
  getStatuses,
  getStatus,
  setOnline,
  updateLastSeen,
  randomToggle
};
