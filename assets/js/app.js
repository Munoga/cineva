/**
 * CINEVA – Application bootstrap (no ES modules, works with file://)
 * Depends on: data.js, storage.js, components.js
 */

function renderHeader() {
  var C = window.CinevaComponents;
  var base = C.basePath();
  var icon = C.icon;
  return (
    '<header class="site-header" role="banner">' +
    '<div class="container header-inner">' +
    '<a href="' + base + 'index.html" class="logo" aria-label="Cineva Home">Cine<span>va</span></a>' +
    '<nav class="main-nav" aria-label="Main">' +
    '<a href="' + base + 'index.html" class="nav-link">Home</a>' +
    '<a href="' + base + 'pages/explore.html" class="nav-link">Explore</a>' +
    '<a href="' + base + 'pages/movies.html" class="nav-link">Movies</a>' +
    '<a href="' + base + 'pages/series.html" class="nav-link">Series</a>' +
    '<a href="' + base + 'pages/anime.html" class="nav-link">Anime</a>' +
    '<div class="nav-dropdown">' +
    '<button type="button" class="nav-link nav-dropdown-trigger" aria-haspopup="true">Genres ' + icon("chevronRight") + '</button>' +
    '<div class="nav-dropdown-menu" role="menu">' +
    '<a href="' + base + 'pages/genre-action.html" role="menuitem">Action</a>' +
    '<a href="' + base + 'pages/genre-comedy.html" role="menuitem">Comedy</a>' +
    '<a href="' + base + 'pages/genre-drama.html" role="menuitem">Drama</a>' +
    '<a href="' + base + 'pages/genre-horror.html" role="menuitem">Horror</a>' +
    '<a href="' + base + 'pages/genre-scifi.html" role="menuitem">Sci-Fi</a>' +
    '<a href="' + base + 'pages/genres.html" role="menuitem">All Genres</a>' +
    '</div></div>' +
    '<a href="' + base + 'pages/trending.html" class="nav-link">Trending</a>' +
    '</nav>' +
    '<div class="header-actions">' +
    '<button type="button" class="header-btn search-trigger" aria-label="Search">' + icon("search") + '</button>' +
    '<a href="' + base + 'pages/my-list.html" class="header-btn" aria-label="My List">' + icon("list") + '</a>' +
    '<a href="' + base + 'pages/notifications.html" class="header-btn notif-btn" id="notif-btn" aria-label="Notifications" style="position:relative">' + icon("bell") +
    '<span id="notif-badge" style="display:none;position:absolute;top:2px;right:2px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:var(--color-accent,#FF0000);color:#fff;font-size:10px;font-weight:700;line-height:16px;text-align:center"></span></a>' +
    '<div class="profile-menu" id="profile-menu">' +
    '<button type="button" class="profile-trigger" id="profile-trigger" aria-haspopup="true" aria-label="Account menu"><span class="profile-avatar" id="profile-avatar">G</span></button>' +
    '<div class="profile-dropdown" role="menu" id="profile-dropdown">' +
    '</div></div>' +
    '<button type="button" class="mobile-menu-btn" aria-label="Open menu" aria-expanded="false">' + icon("menu") + '</button>' +
    '</div></div></header>' +
    '<nav class="mobile-nav" aria-label="Mobile menu">' +
    '<div class="mobile-nav-header">' +
    '<a href="' + base + 'index.html" class="logo">Cine<span>va</span></a>' +
    '<button type="button" class="header-btn mobile-nav-close" aria-label="Close menu">' + icon("close") + '</button>' +
    '</div>' +
    '<div class="mobile-nav-links">' +
    '<a href="' + base + 'index.html">Home</a>' +
    '<a href="' + base + 'pages/explore.html">Explore</a>' +
    '<a href="' + base + 'pages/movies.html">Movies</a>' +
    '<a href="' + base + 'pages/series.html">Series</a>' +
    '<a href="' + base + 'pages/anime.html">Anime</a>' +
    '<a href="' + base + 'pages/genres.html">Genres</a>' +
    '<a href="' + base + 'pages/trending.html">Trending</a>' +
    '<a href="' + base + 'pages/recommendations.html">Recommendations</a>' +
    '<a href="' + base + 'pages/my-list.html">My List</a>' +
    '<a href="' + base + 'pages/profile.html">Profile</a>' +
    '<a href="' + base + 'pages/settings.html">Settings</a>' +
    '<a href="' + base + 'pages/help.html">Help</a>' +
    '</div></nav>'
  );
}

function renderFooter() {
  var C = window.CinevaComponents;
  var base = C.basePath();
  var year = new Date().getFullYear();
  return (
    '<footer class="site-footer" role="contentinfo"><div class="container">' +
    '<div class="footer-grid">' +
    '<div class="footer-brand"><a href="' + base + 'index.html" class="logo">Cine<span>va</span></a>' +
    '<p>Premium movie and series discovery. Explore, save, and watch with a cinematic experience.</p></div>' +
    '<div><h4 class="footer-heading">Browse</h4><div class="footer-links">' +
    '<a href="' + base + 'pages/movies.html">Movies</a>' +
    '<a href="' + base + 'pages/series.html">TV Series</a>' +
    '<a href="' + base + 'pages/anime.html">Anime</a>' +
    '<a href="' + base + 'pages/genres.html">Genres</a>' +
    '<a href="' + base + 'pages/collections.html">Collections</a>' +
    '<a href="' + base + 'pages/trending.html">Trending</a>' +
    '<a href="' + base + 'pages/recommendations.html">Recommendations</a></div></div>' +
    '<div><h4 class="footer-heading">Account</h4><div class="footer-links">' +
    '<a href="' + base + 'pages/my-list.html">My List</a>' +
    '<a href="' + base + 'pages/favorites.html">Favorites</a>' +
    '<a href="' + base + 'pages/history.html">Watch History</a>' +
    '<a href="' + base + 'pages/profile.html">Profile</a>' +
    '<a href="' + base + 'pages/settings.html">Settings</a></div></div>' +
    '<div><h4 class="footer-heading">Support</h4><div class="footer-links">' +
    '<a href="' + base + 'pages/help.html">Help Center</a>' +
    '<a href="' + base + 'pages/contact.html">Contact</a>' +
    '<a href="' + base + 'pages/about.html">About</a>' +
    '<a href="' + base + 'pages/privacy.html">Privacy Policy</a>' +
    '<a href="' + base + 'pages/terms.html">Terms of Service</a></div></div>' +
    '</div>' +
    '<div class="footer-bottom"><span>&copy; ' + year + ' Cineva. All rights reserved. Demo frontend.</span>' +
    '<span>Pure HTML, CSS &amp; JavaScript</span></div>' +
    '</div></footer>'
  );
}

function initSearch() {
  var C = window.CinevaComponents;
  var D = window.CinevaData;
  var S = window.CinevaStorage;
  var icon = C.icon;
  var escapeHtml = C.escapeHtml;
  var detailsUrl = C.detailsUrl;

  var overlay = document.createElement("div");
  overlay.className = "search-overlay";
  overlay.id = "search-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "Search");
  overlay.innerHTML =
    '<div class="search-overlay-header">' +
    '<div class="search-input-wrap">' +
    '<input type="search" id="search-input" placeholder="Search movies, series, anime..." autocomplete="off" aria-label="Search titles">' +
    '<button type="button" class="clear-btn" id="search-clear" aria-label="Clear search" hidden>' + icon("close") + '</button>' +
    '</div>' +
    '<button type="button" class="btn btn-secondary" id="search-close">Close</button>' +
    '</div>' +
    '<div class="search-results" id="search-results"></div>';
  document.body.appendChild(overlay);

  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  var clearBtn = document.getElementById("search-clear");
  var closeBtn = document.getElementById("search-close");
  var debounceTimer = null;

  function open() {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    input.focus();
    renderDefaultSearch();
  }
  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    input.value = "";
    clearBtn.hidden = true;
  }
  function renderDefaultSearch() {
    var recent = S.getRecentSearches();
    var trending = D.getTrending().slice(0, 6);
    var html = "";
    if (recent.length) {
      html += '<div class="search-section-title">Recent searches</div>';
      recent.forEach(function (q) {
        html += '<button type="button" class="search-result-item recent-q" data-q="' + escapeHtml(q) + '"><span>' + escapeHtml(q) + '</span></button>';
      });
      html += '<button type="button" class="btn btn-ghost btn-sm" id="clear-recent" style="margin-top:8px">Clear recent</button>';
    }
    html += '<div class="search-section-title">Trending now</div>';
    trending.forEach(function (t) {
      html +=
        '<a href="' + detailsUrl(t) + '" class="search-result-item">' +
        '<img src="' + t.poster + '" alt="" width="48" height="72" loading="lazy" onerror="this.style.opacity=0.3">' +
        '<div class="search-result-info"><h4>' + escapeHtml(t.title) + '</h4>' +
        '<p>' + t.year + ' · ' + t.type + ' · ★ ' + t.rating.toFixed(1) + '</p></div></a>';
    });
    results.innerHTML = html;
    results.querySelectorAll(".recent-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        input.value = btn.getAttribute("data-q");
        clearBtn.hidden = false;
        doSearch(btn.getAttribute("data-q"));
      });
    });
    var clearRecent = document.getElementById("clear-recent");
    if (clearRecent) {
      clearRecent.addEventListener("click", function () {
        S.clearRecentSearches();
        renderDefaultSearch();
      });
    }
  }
  function doSearch(query) {
    if (!query.trim()) {
      renderDefaultSearch();
      return;
    }
    var matches = D.searchTitles(query).slice(0, 20);
    S.addRecentSearch(query);
    if (!matches.length) {
      results.innerHTML = '<div class="empty-state"><h3>No results for “' + escapeHtml(query) + '”</h3><p>Try a different title, director, or genre.</p></div>';
      return;
    }
    var html = '<div class="search-section-title">' + matches.length + ' result' + (matches.length === 1 ? "" : "s") + '</div>';
    matches.forEach(function (t) {
      html +=
        '<a href="' + detailsUrl(t) + '" class="search-result-item">' +
        '<img src="' + t.poster + '" alt="" width="48" height="72" loading="lazy" onerror="this.style.opacity=0.3">' +
        '<div class="search-result-info"><h4>' + escapeHtml(t.title) + '</h4>' +
        '<p>' + t.year + ' · ' + t.type + ' · ★ ' + t.rating.toFixed(1) + '</p></div></a>';
    });
    results.innerHTML = html;
  }

  document.querySelectorAll(".search-trigger").forEach(function (btn) {
    btn.addEventListener("click", open);
  });
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      open();
    }
  });
  input.addEventListener("input", function () {
    clearBtn.hidden = !input.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () { doSearch(input.value); }, 220);
  });
  clearBtn.addEventListener("click", function () {
    input.value = "";
    clearBtn.hidden = true;
    input.focus();
    renderDefaultSearch();
  });
}

function initApp() {
  /* sign-in hooks added */
  setTimeout(function(){ ensureSignInModal(); refreshProfileMenu(); }, 0);
  return _cinevaInitAppBody();
}
function _cinevaInitAppBody() {
  var C = window.CinevaComponents;
  var headerMount = document.getElementById("site-header");
  var footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.outerHTML = renderHeader();
  if (footerMount) footerMount.outerHTML = renderFooter();
  C.initHeader();
  C.initMobileNav();
  C.initCarousels();
  C.setActiveNav();
  initSearch();
}



/* ----- Sign-in modal (no full account system) ----- */
function ensureSignInModal() {
  if (document.getElementById("cineva-signin-modal")) return;
  var wrap = document.createElement("div");
  wrap.id = "cineva-signin-modal";
  wrap.setAttribute("role", "dialog");
  wrap.setAttribute("aria-modal", "true");
  wrap.setAttribute("aria-labelledby", "cineva-signin-title");
  wrap.style.cssText = "display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.72);align-items:center;justify-content:center;padding:16px;";
  wrap.innerHTML =
    '<div style="background:var(--color-bg-elevated,#171717);border:1px solid var(--color-border,#404040);border-radius:10px;max-width:400px;width:100%;padding:24px;box-shadow:0 16px 48px rgba(0,0,0,.5);">' +
    '<h2 id="cineva-signin-title" style="margin:0 0 8px;font-size:1.25rem;">Sign in</h2>' +
    '<p id="cineva-signin-msg" style="margin:0 0 16px;color:var(--color-text-secondary,#a3a3a3);font-size:0.9rem;">Sign in to save Favourites and Watchlist.</p>' +
    '<label style="display:block;font-size:0.8rem;margin-bottom:4px;color:var(--color-text-secondary,#a3a3a3);">Email</label>' +
    '<input id="cineva-signin-email" type="email" placeholder="you@example.com" style="width:100%;padding:10px 12px;margin-bottom:12px;border-radius:6px;border:1px solid var(--color-border,#404040);background:var(--color-bg,#000);color:inherit;font:inherit;box-sizing:border-box;">' +
    '<label style="display:block;font-size:0.8rem;margin-bottom:4px;color:var(--color-text-secondary,#a3a3a3);">Name (optional)</label>' +
    '<input id="cineva-signin-name" type="text" placeholder="Your name" style="width:100%;padding:10px 12px;margin-bottom:16px;border-radius:6px;border:1px solid var(--color-border,#404040);background:var(--color-bg,#000);color:inherit;font:inherit;box-sizing:border-box;">' +
    '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
    '<button type="button" id="cineva-signin-submit" class="btn btn-primary" style="flex:1;">Sign in</button>' +
    '<button type="button" id="cineva-signin-cancel" class="btn btn-ghost">Cancel</button>' +
    '</div>' +
    '<p style="margin:14px 0 0;font-size:0.75rem;color:var(--color-text-muted,#737373);">Demo sign-in only. No password or server account is created.</p>' +
    '</div>';
  document.body.appendChild(wrap);
  wrap.addEventListener("click", function (e) {
    if (e.target === wrap) closeSignInModal();
  });
  document.getElementById("cineva-signin-cancel").addEventListener("click", closeSignInModal);
  document.getElementById("cineva-signin-submit").addEventListener("click", function () {
    var email = document.getElementById("cineva-signin-email").value;
    var name = document.getElementById("cineva-signin-name").value;
    if (!email || !email.trim()) {
      document.getElementById("cineva-signin-email").focus();
      return;
    }
    window.CinevaStorage.signIn(email, name || email.split("@")[0]);
    closeSignInModal();
    refreshProfileMenu();
    if (window.CinevaComponents && window.CinevaComponents.showToast) {
      window.CinevaComponents.showToast("Signed in");
    }
  });
}

function openSignInModal(message) {
  /* Prefer dedicated sign-in page */
  var C = window.CinevaComponents;
  var base = C ? C.basePath() : "";
  var url = base + "pages/signin.html";
  if (message) url += "?msg=" + encodeURIComponent(message);
  window.location.href = url;
}

function closeSignInModal() {
  var el = document.getElementById("cineva-signin-modal");
  if (el) el.style.display = "none";
}

function refreshProfileMenu() {
  var S = window.CinevaStorage;
  var C = window.CinevaComponents;
  var base = C.basePath();
  var icon = C.icon;
  var dropdown = document.getElementById("profile-dropdown");
  var avatar = document.getElementById("profile-avatar");
  if (!dropdown) return;
  var signed = S.isSignedIn();
  var user = S.getAuthUser();
  if (avatar) {
    avatar.textContent = signed && user && user.name ? user.name.charAt(0).toUpperCase() : "G";
  }
  if (signed) {
    dropdown.innerHTML =
      '<div style="padding:8px 12px;font-size:0.8rem;color:var(--color-text-secondary,#a3a3a3);">' +
      (user && user.email ? C.escapeHtml(user.email) : "Signed in") + "</div>" +
      '<a href="' + base + 'pages/profile.html" role="menuitem">' + icon("user") + " Profile</a>" +
      '<a href="' + base + 'pages/my-list.html" role="menuitem">' + icon("list") + " Watchlist</a>" +
      '<a href="' + base + 'pages/favorites.html" role="menuitem">' + icon("heart") + " Favourites</a>" +
      '<a href="' + base + 'pages/notifications.html" role="menuitem">Notifications</a>' +
      '<a href="' + base + 'pages/settings.html" role="menuitem">Settings</a>' +
      '<div class="divider"></div>' +
      '<button type="button" role="menuitem" id="cineva-signout-btn" style="display:block;width:100%;text-align:left;padding:8px 12px;background:none;border:0;color:inherit;font:inherit;cursor:pointer;">Sign out</button>';
    var so = document.getElementById("cineva-signout-btn");
    if (so) {
      so.addEventListener("click", function () {
        S.signOut();
        refreshProfileMenu();
        if (C.showToast) C.showToast("Signed out");
      });
    }
  } else {
    dropdown.innerHTML =
      '<a href="' + base + 'pages/signin.html" role="menuitem">' + icon("user") + " Sign in</a>" +
      '<a href="' + base + 'pages/signup.html" role="menuitem">Create account</a>' +
      '<div class="divider"></div>' +
      '<a href="' + base + 'pages/help.html" role="menuitem">Help</a>';
  }
  updateNotifBadge();
}



function updateNotifBadge() {
  var badge = document.getElementById("notif-badge");
  if (!badge || !window.CinevaStorage) return;
  var S = window.CinevaStorage;
  /* User-facing: unread demo notifications; admin count is separate on admin page */
  var list = S.getNotifications ? S.getNotifications() : [];
  var unread = list.filter(function (n) { return !n.read; }).length;
  if (unread > 0) {
    badge.style.display = "block";
    badge.textContent = unread > 9 ? "9+" : String(unread);
  } else {
    badge.style.display = "none";
  }
}

window.CinevaApp = {
  openSignInModal: openSignInModal,
  closeSignInModal: closeSignInModal,
  refreshProfileMenu: refreshProfileMenu, initApp: initApp, renderHeader: renderHeader, renderFooter: renderFooter };
