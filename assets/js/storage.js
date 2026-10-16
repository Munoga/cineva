

const PREFIX = "cineva_";

function safeGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(PREFIX + key);
    return true;
  } catch {
    return false;
  }
}

/* ----- My List ----- */
function getMyList() {
  return safeGet("mylist", []);
}

function addToMyList(id) {
  const list = getMyList();
  if (!list.includes(id)) {
    list.unshift(id);
    safeSet("mylist", list);
  }
  return list;
}

function removeFromMyList(id) {
  const list = getMyList().filter((x) => x !== id);
  safeSet("mylist", list);
  return list;
}

function isInMyList(id) {
  return getMyList().includes(id);
}

function toggleMyList(id) {
  if (isInMyList(id)) {
    removeFromMyList(id);
    return false;
  }
  addToMyList(id);
  return true;
}

/* ----- Favorites ----- */
function getFavorites() {
  return safeGet("favorites", []);
}

function addFavorite(id) {
  const list = getFavorites();
  if (!list.includes(id)) {
    list.unshift(id);
    safeSet("favorites", list);
  }
  return list;
}

function removeFavorite(id) {
  const list = getFavorites().filter((x) => x !== id);
  safeSet("favorites", list);
  return list;
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    removeFavorite(id);
    return false;
  }
  addFavorite(id);
  return true;
}

/* ----- Watch History / Continue Watching ----- */
function getHistory() {
  return safeGet("history", []);
}

function addToHistory(id) {
  let history = getHistory().filter((x) => x !== id);
  history.unshift(id);
  if (history.length > 50) history = history.slice(0, 50);
  safeSet("history", history);
  return history;
}

function clearHistory() {
  safeSet("history", []);
  safeSet("progress", {});
}

/* ----- Playback Progress ----- */
function getProgress() {
  return safeGet("progress", {});
}

function setProgress(id, percent, currentTime = 0) {
  const progress = getProgress();
  progress[id] = { percent: Math.min(100, Math.max(0, percent)), currentTime, updated: Date.now() };
  safeSet("progress", progress);
}

function getProgressFor(id) {
  const progress = getProgress();
  return progress[id] || null;
}

function getContinueWatching() {
  const progress = getProgress();
  const history = getHistory();
  return history
    .filter((id) => progress[id] && progress[id].percent > 2 && progress[id].percent < 95)
    .map((id) => ({ id, ...progress[id] }));
}

/* ----- Recent Searches ----- */
function getRecentSearches() {
  return safeGet("recent_searches", []);
}

function addRecentSearch(query) {
  if (!query || !query.trim()) return;
  let searches = getRecentSearches().filter((s) => s.toLowerCase() !== query.toLowerCase());
  searches.unshift(query.trim());
  if (searches.length > 8) searches = searches.slice(0, 8);
  safeSet("recent_searches", searches);
}

function clearRecentSearches() {
  safeSet("recent_searches", []);
}

/* ----- Profile / Preferences ----- */
function getProfile() {
  return safeGet("profile", {
    name: "Guest Viewer",
    avatar: "G",
    preferredGenres: [],
    language: "en",
    autoplay: true,
    reducedMotion: false,
  });
}

function saveProfile(profile) {
  safeSet("profile", { ...getProfile(), ...profile });
}

function getPreferences() {
  return safeGet("preferences", {
    autoplayTrailers: false,
    defaultQuality: "auto",
    subtitles: false,
  });
}

function savePreferences(prefs) {
  safeSet("preferences", { ...getPreferences(), ...prefs });
}

/* ----- Notifications (demo) ----- */
function getNotifications() {
  return safeGet("notifications", [
    {
      id: "n1",
      title: "New episode available",
      body: "Crown of Embers S2E2 is now ready to watch.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "n2",
      title: "Added to your list",
      body: "Neon Horizon was added to My List.",
      time: "Yesterday",
      read: true,
    },
    {
      id: "n3",
      title: "Recommendation",
      body: "Based on your viewing, try Echo Protocol.",
      time: "3 days ago",
      read: true,
    },
  ]);
}

function markNotificationRead(id) {
  const list = getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n));
  safeSet("notifications", list);
  return list;
}

function clearNotifications() {
  safeSet("notifications", []);
}

/* ----- Reset all demo data ----- */
function resetAllData() {
  const keys = ["mylist", "favorites", "history", "progress", "recent_searches", "profile", "preferences", "notifications", "auth", "admin_movies", "stats", "users", "movie_requests", "admin_notifications"];
  keys.forEach((k) => safeRemove(k));
}



/* ----- Auth: sign up / sign in (demo, localStorage only) ----- */
function _hash(pw) {
  /* lightweight demo hash — not for production */
  var s = String(pw || "");
  var h = 5381;
  for (var i = 0; i < s.length; i++) h = ((h << 5) + h) + s.charCodeAt(i);
  return "h" + (h >>> 0).toString(16);
}

function getUsers() {
  return safeGet("users", {});
}

function saveUsers(users) {
  safeSet("users", users);
}

function isSignedIn() {
  const a = safeGet("auth", null);
  return !!(a && a.signedIn && a.email);
}

function getAuthUser() {
  const a = safeGet("auth", null);
  if (!a || !a.signedIn || !a.email) return null;
  const users = getUsers();
  const u = users[a.email.toLowerCase()];
  if (!u) return { email: a.email, name: a.name || "Member", signedIn: true };
  return {
    signedIn: true,
    email: u.email,
    name: u.name || "Member",
    createdAt: u.createdAt,
  };
}

function signUp(email, password, name) {
  email = String(email || "").trim().toLowerCase();
  password = String(password || "");
  name = String(name || "").trim() || email.split("@")[0];
  if (!email || !email.includes("@")) return { ok: false, error: "Enter a valid email." };
  if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
  const users = getUsers();
  if (users[email]) return { ok: false, error: "An account with this email already exists. Sign in instead." };
  users[email] = {
    email: email,
    name: name,
    passwordHash: _hash(password),
    createdAt: Date.now(),
  };
  saveUsers(users);
  safeSet("auth", { signedIn: true, email: email, name: name, at: Date.now() });
  return { ok: true, user: getAuthUser() };
}

function signIn(email, password) {
  email = String(email || "").trim().toLowerCase();
  password = String(password || "");
  if (!email || !password) return { ok: false, error: "Email and password are required." };
  const users = getUsers();
  const u = users[email];
  if (!u) return { ok: false, error: "No account found. Please sign up." };
  if (u.passwordHash !== _hash(password)) return { ok: false, error: "Incorrect password." };
  safeSet("auth", { signedIn: true, email: u.email, name: u.name, at: Date.now() });
  return { ok: true, user: getAuthUser() };
}

/** Legacy helper used by older modal code */
function signInLegacy(email, name) {
  return signIn(email, "demo-password-not-used") ;
}

function signOut() {
  safeRemove("auth");
}

function updateProfile(fields) {
  if (!isSignedIn()) return { ok: false, error: "Not signed in." };
  const auth = safeGet("auth", {});
  const email = (auth.email || "").toLowerCase();
  const users = getUsers();
  if (!users[email]) return { ok: false, error: "User not found." };
  if (fields.name != null) {
    users[email].name = String(fields.name).trim() || users[email].name;
    auth.name = users[email].name;
  }
  saveUsers(users);
  safeSet("auth", auth);
  return { ok: true, user: getAuthUser() };
}

function changePassword(currentPw, newPw) {
  if (!isSignedIn()) return { ok: false, error: "Not signed in." };
  const auth = safeGet("auth", {});
  const email = (auth.email || "").toLowerCase();
  const users = getUsers();
  const u = users[email];
  if (!u) return { ok: false, error: "User not found." };
  if (u.passwordHash !== _hash(currentPw)) return { ok: false, error: "Current password is incorrect." };
  if (String(newPw || "").length < 6) return { ok: false, error: "New password must be at least 6 characters." };
  u.passwordHash = _hash(newPw);
  saveUsers(users);
  return { ok: true };
}

/* ----- Admin-added movies (merged into catalogue on load) ----- */
function getAdminMovies() {
  return safeGet("admin_movies", []);
}

function addAdminMovie(movie) {
  const list = getAdminMovies();
  list.unshift(movie);
  safeSet("admin_movies", list);
  return list;
}

function removeAdminMovie(id) {
  const list = getAdminMovies().filter((m) => m.id !== id);
  safeSet("admin_movies", list);
  return list;
}

/* ----- Stats: views, downloads, favorites, watchlist per movie; VJ aggregates ----- */
function getStats() {
  return safeGet("stats", { movies: {}, vjs: {} });
}

function saveStats(stats) {
  safeSet("stats", stats);
}

function ensureMovieStats(stats, id) {
  if (!stats.movies[id]) {
    stats.movies[id] = { views: 0, downloads: 0, favorites: 0, watchlist: 0, likes: 0 };
  }
  return stats.movies[id];
}

function ensureVjStats(stats, vj) {
  if (!vj) return null;
  if (!stats.vjs[vj]) {
    stats.vjs[vj] = { views: 0, downloads: 0, likes: 0 };
  }
  return stats.vjs[vj];
}

function recordMovieView(id, vj) {
  const stats = getStats();
  const m = ensureMovieStats(stats, id);
  m.views += 1;
  if (vj) {
    const v = ensureVjStats(stats, vj);
    if (v) v.views += 1;
  }
  saveStats(stats);
  return stats;
}

function recordMovieDownload(id, vj) {
  const stats = getStats();
  const m = ensureMovieStats(stats, id);
  m.downloads += 1;
  if (vj) {
    const v = ensureVjStats(stats, vj);
    if (v) v.downloads += 1;
  }
  saveStats(stats);
  return stats;
}


function recordMovieLike(id, vj) {
  const stats = getStats();
  const m = ensureMovieStats(stats, id);
  m.likes = (m.likes || 0) + 1;
  if (vj) {
    const v = ensureVjStats(stats, vj);
    if (v) v.likes = (v.likes || 0) + 1;
  }
  saveStats(stats);
  return stats;
}

function syncListCounts() {
  /* Recount favorites / watchlist from current lists */
  const stats = getStats();
  const favs = getFavorites();
  const list = getMyList();
  Object.keys(stats.movies).forEach((id) => {
    stats.movies[id].favorites = 0;
    stats.movies[id].watchlist = 0;
  });
  favs.forEach((id) => {
    ensureMovieStats(stats, id).favorites += 1;
  });
  list.forEach((id) => {
    ensureMovieStats(stats, id).watchlist += 1;
  });
  saveStats(stats);
  return stats;
}



/* ----- Movie requests (users → admin notifications) ----- */
function getMovieRequests() {
  return safeGet("movie_requests", []);
}

function addMovieRequest(payload) {
  const list = getMovieRequests();
  const req = {
    id: "req_" + Date.now().toString(36),
    title: String(payload.title || "").trim(),
    year: payload.year ? Number(payload.year) : null,
    note: String(payload.note || "").trim(),
    fromEmail: payload.fromEmail || null,
    fromName: payload.fromName || "Guest",
    status: "pending",
    createdAt: Date.now(),
  };
  if (!req.title) return { ok: false, error: "Movie title is required." };
  list.unshift(req);
  safeSet("movie_requests", list);
  addAdminNotification({
    type: "movie_request",
    title: "Movie request: " + req.title,
    body: (req.fromName || "Someone") + ' requested "' + req.title + '"' + (req.year ? " (" + req.year + ")" : "") + (req.note ? " - " + req.note : ""),
    requestId: req.id,
  });
  return { ok: true, request: req };
}

function setMovieRequestStatus(id, status) {
  const list = getMovieRequests().map(function (r) {
    return r.id === id ? Object.assign({}, r, { status: status }) : r;
  });
  safeSet("movie_requests", list);
  return list;
}

function getAdminNotifications() {
  return safeGet("admin_notifications", []);
}

function addAdminNotification(n) {
  const list = getAdminNotifications();
  list.unshift({
    id: "an_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    type: n.type || "info",
    title: n.title || "Notification",
    body: n.body || "",
    requestId: n.requestId || null,
    read: false,
    createdAt: Date.now(),
  });
  if (list.length > 100) list.length = 100;
  safeSet("admin_notifications", list);
  return list;
}

function markAdminNotificationRead(id) {
  const list = getAdminNotifications().map(function (n) {
    return n.id === id ? Object.assign({}, n, { read: true }) : n;
  });
  safeSet("admin_notifications", list);
  return list;
}

function markAllAdminNotificationsRead() {
  const list = getAdminNotifications().map(function (n) {
    return Object.assign({}, n, { read: true });
  });
  safeSet("admin_notifications", list);
  return list;
}

function countUnreadAdminNotifications() {
  return getAdminNotifications().filter(function (n) { return !n.read; }).length;
}


window.CinevaStorage = {
  getMyList,
  addToMyList,
  removeFromMyList,
  isInMyList,
  toggleMyList,
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  toggleFavorite,
  getHistory,
  addToHistory,
  clearHistory,
  getProgress,
  setProgress,
  getProgressFor,
  getContinueWatching,
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
  getProfile,
  saveProfile,
  getPreferences,
  savePreferences,
  getNotifications,
  markNotificationRead,
  clearNotifications,
  resetAllData,
  isSignedIn,
  getAuthUser,
  signUp,
  signIn,
  signOut,
  updateProfile,
  changePassword,
  getAdminMovies,
  addAdminMovie,
  removeAdminMovie,
  getStats,
  recordMovieView,
  recordMovieDownload,
  recordMovieLike,
  syncListCounts,
  getMovieRequests,
  addMovieRequest,
  setMovieRequestStatus,
  getAdminNotifications,
  addAdminNotification,
  markAdminNotificationRead,
  markAllAdminNotificationsRead,
  countUnreadAdminNotifications
};
