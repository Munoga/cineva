
(function () {
  var D = window.CinevaData;
  var S = window.CinevaStorage;
  var C = window.CinevaComponents;

  window.CinevaApp.initApp();

  var path = window.location.pathname || window.location.href;
  var page = path.split("/").pop().replace(".html", "").split("?")[0] || "index";
  var params = new URLSearchParams(window.location.search);

  function setTitle(t, d) {
    var el = document.getElementById("page-title");
    var desc = document.getElementById("page-desc");
    if (el) el.textContent = t;
    if (desc) desc.textContent = d || "";
  }

  if (["explore", "trending", "popular", "latest", "upcoming"].indexOf(page) !== -1) {
    var configs = {
      explore: { title: "Explore", desc: "Discover movies, series, and anime across the catalog.", fn: function () { return D.getPopular(60); } },
      trending: { title: "Trending", desc: "What everyone is watching right now.", fn: function () { return D.getTrending(); } },
      popular: { title: "Most Popular", desc: "The highest popularity titles on Cineva.", fn: function () { return D.getPopular(40); } },
      latest: { title: "Latest Releases", desc: "Recently added and newly released titles.", fn: function () { return D.getLatest(40); } },
      upcoming: { title: "Upcoming", desc: "Titles marked as recent or upcoming in our catalog.", fn: function () { return D.getLatest(20); } }
    };
    var cfg = configs[page];
    setTitle(cfg.title, cfg.desc);
    var content = document.getElementById("page-content");
    content.innerHTML = '<p class="results-count" id="rc"></p><div class="card-grid" id="grid"></div>';
    var results = cfg.fn();
    document.getElementById("rc").textContent = results.length + " titles";
    C.renderCardGrid(document.getElementById("grid"), results);
  }

  if (page === "genres") {
    setTitle("All Genres", "Browse the catalog by genre.");
    var content = document.getElementById("page-content");
    content.innerHTML = '<div class="genre-grid" id="gg"></div>';
    var gg = document.getElementById("gg");
    D.GENRES.forEach(function (g) {
      var a = document.createElement("a");
      a.href = "genre-" + g.slug + ".html";
      a.className = "genre-card";
      a.textContent = g.name;
      gg.appendChild(a);
    });
  }

  if (page.indexOf("genre-") === 0) {
    var slug = page.replace("genre-", "");
    var genre = D.GENRES.find(function (g) { return g.slug === slug; });
    var name = genre ? genre.name : slug;
    document.title = name + " – Cineva";
    setTitle(name, "Titles in the " + name + " genre.");
    var content = document.getElementById("page-content");
    content.innerHTML = '<p class="results-count" id="rc"></p><div class="card-grid" id="grid"></div>';
    var results = D.getByGenre(slug);
    document.getElementById("rc").textContent = results.length + " titles";
    C.renderCardGrid(document.getElementById("grid"), results);
  }

  if (page === "my-list") {
    setTitle("My List", "Titles you have saved for later.");
    var ids = S.getMyList();
    var content = document.getElementById("page-content");
    if (!ids.length) {
      content.innerHTML = '<div class="empty-state"><h3>Your list is empty</h3><p>Add movies and series from any details page or card.</p><a href="' + C.pageUrl("explore") + '" class="btn btn-primary">Explore</a></div>';
    } else {
      content.innerHTML = '<p class="results-count">' + ids.length + ' titles</p><div class="card-grid" id="grid"></div>';
      C.renderCardGrid(document.getElementById("grid"), ids.map(D.getTitleById).filter(Boolean));
    }
  }

  if (page === "favorites") {
    setTitle("Favorites", "Your favorite titles.");
    var ids = S.getFavorites();
    var content = document.getElementById("page-content");
    if (!ids.length) {
      content.innerHTML = '<div class="empty-state"><h3>No favorites yet</h3><p>Tap the heart on any title to save it here.</p><a href="' + C.pageUrl("explore") + '" class="btn btn-primary">Explore</a></div>';
    } else {
      content.innerHTML = '<p class="results-count">' + ids.length + ' titles</p><div class="card-grid" id="grid"></div>';
      C.renderCardGrid(document.getElementById("grid"), ids.map(D.getTitleById).filter(Boolean));
    }
  }

  if (page === "history") {
    setTitle("Watch History", "Titles you have viewed recently.");
    var ids = S.getHistory();
    var content = document.getElementById("page-content");
    if (!ids.length) {
      content.innerHTML = '<div class="empty-state"><h3>No history yet</h3><p>Browse and open title details to build history.</p><a href="' + C.pageUrl("explore") + '" class="btn btn-primary">Explore</a></div>';
    } else {
      content.innerHTML = '<div style="margin-bottom:var(--space-4)"><button type="button" class="btn btn-secondary btn-sm" id="clear-hist">Clear history</button></div><p class="results-count">' + ids.length + ' titles</p><div class="card-grid" id="grid"></div>';
      C.renderCardGrid(document.getElementById("grid"), ids.map(D.getTitleById).filter(Boolean));
      document.getElementById("clear-hist").addEventListener("click", function () {
        if (confirm("Clear all watch history?")) { S.clearHistory(); location.reload(); }
      });
    }
  }

  if (page === "continue-watching") {
    setTitle("Continue Watching", "Pick up where you left off.");
    var items = S.getContinueWatching();
    var content = document.getElementById("page-content");
    if (!items.length) {
      content.innerHTML = '<div class="empty-state"><h3>Nothing in progress</h3><p>Start watching a title and progress will appear here.</p><a href="' + C.pageUrl("explore") + '" class="btn btn-primary">Explore</a></div>';
    } else {
      content.innerHTML = '<div class="card-grid" id="grid"></div>';
      C.renderCardGrid(document.getElementById("grid"), items.map(function (i) { return D.getTitleById(i.id); }).filter(Boolean), { showProgress: true });
    }
  }

  if (page === "recommendations") {
    setTitle("Recommended for You", "Picks based on popularity, your list, and similar genres.");
    var content = document.getElementById("page-content");
    var favIds = S.getFavorites();
    var listIds = S.getMyList();
    var historyIds = S.getHistory();
    var seed = null;
    var seedId = favIds[0] || listIds[0] || historyIds[0];
    if (seedId) seed = D.getTitleById(seedId);
    var recommended = [];
    if (seed && D.getSimilar) {
      recommended = D.getSimilar(seed, 12);
    }
    if (!recommended.length) {
      recommended = D.getPopular(18);
    }
    // de-dupe and exclude already in list
    var seen = {};
    recommended = recommended.filter(function (t) {
      if (!t || seen[t.id]) return false;
      seen[t.id] = true;
      return true;
    });
    content.innerHTML =
      (seed ? '<p class="text-secondary" style="margin-bottom:var(--space-4)">Because you watched or saved <strong>' + C.escapeHtml(seed.title) + '</strong></p>' : '') +
      '<div class="card-grid" id="grid"></div>' +
      '<section style="margin-top:var(--space-10)">' +
      '<h2 class="section-title" style="margin-bottom:var(--space-4)">Request a movie</h2>' +
      '<p class="text-secondary" style="margin-bottom:var(--space-3);font-size:0.9rem">Can\'t find a title? Send a request — admins see it in the admin panel.</p>' +
      '<form id="request-form" style="max-width:480px;display:grid;gap:10px">' +
      '<input name="title" required placeholder="Movie title *" style="padding:10px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-bg);color:inherit">' +
      '<input name="note" placeholder="Year, VJ, or notes (optional)" style="padding:10px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-bg);color:inherit">' +
      '<button type="submit" class="btn btn-primary">Submit request</button>' +
      '<p id="req-msg" style="font-size:0.85rem;margin:0"></p>' +
      '</form></section>';
    C.renderCardGrid(document.getElementById("grid"), recommended);
    document.getElementById("request-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(e.target);
      var title = String(fd.get("title") || "").trim();
      var note = String(fd.get("note") || "").trim();
      if (!S.isSignedIn()) {
        if (window.CinevaApp && window.CinevaApp.openSignInModal) {
          window.CinevaApp.openSignInModal("Sign in to submit a movie request.");
        } else {
          location.href = C.pageUrl("signin") + "?next=recommendations";
        }
        return;
      }
      if (S.addMovieRequest) {
        var u = S.getAuthUser() || {};
        S.addMovieRequest({ title: title, note: note, fromEmail: u.email, fromName: u.name });
        document.getElementById("req-msg").textContent = "Request sent.";
        document.getElementById("req-msg").style.color = "var(--color-accent,#FF0000)";
        e.target.reset();
      }
    });
  }

  if (page === "collections") {
    setTitle("Collections", "Editorial lists curated for every mood.");
    var content = document.getElementById("page-content");
    content.innerHTML = '<div class="collection-grid" id="cg"></div>';
    var cg = document.getElementById("cg");
    D.COLLECTIONS.forEach(function (c) {
      var a = document.createElement("a");
      a.href = "collection-details.html?id=" + c.slug;
      a.className = "collection-card";
      a.innerHTML = '<img src="' + c.backdrop + '" alt="" loading="lazy" onerror="this.style.display=\'none\'"><div class="collection-card-overlay"><h3>' + C.escapeHtml(c.title) + '</h3><p>' + C.escapeHtml(c.description) + '</p></div>';
      cg.appendChild(a);
    });
  }

  if (page === "collection-details") {
    var col = D.getCollectionBySlug(params.get("id"));
    if (!col) {
      setTitle("Collection not found", "");
      document.getElementById("page-content").innerHTML = '<div class="empty-state"><h3>Not found</h3><a href="collections.html" class="btn btn-primary">All collections</a></div>';
    } else {
      document.title = col.title + " – Cineva";
      setTitle(col.title, col.description);
      var titles = col.titleIds.map(D.getTitleById).filter(Boolean);
      document.getElementById("page-content").innerHTML = '<p class="results-count">' + titles.length + ' titles</p><div class="card-grid" id="grid"></div>';
      C.renderCardGrid(document.getElementById("grid"), titles);
    }
  }

  if (page === "people") {
    setTitle("Cast & Crew", "Directors and actors featured in the catalog.");
    var content = document.getElementById("page-content");
    content.innerHTML = '<div class="people-grid" id="pg"></div>';
    var pg = document.getElementById("pg");
    D.PEOPLE.forEach(function (p) {
      var a = document.createElement("a");
      a.href = "person-details.html?id=" + p.id;
      a.className = "person-card";
      a.innerHTML = '<div class="person-card-photo"><img src="' + p.image + '" alt="" loading="lazy"></div><h3>' + C.escapeHtml(p.name) + '</h3><p>' + C.escapeHtml(p.role) + '</p>';
      pg.appendChild(a);
    });
  }

  if (page === "person-details") {
    var person = D.getPersonById(params.get("id"));
    if (!person) {
      setTitle("Person not found", "");
      document.getElementById("page-content").innerHTML = '<div class="empty-state"><a href="people.html" class="btn btn-primary">Directory</a></div>';
    } else {
      document.title = person.name + " – Cineva";
      setTitle(person.name, person.role + " · " + person.bio);
      var titles = person.titleIds.map(D.getTitleById).filter(Boolean);
      document.getElementById("page-content").innerHTML = '<div class="card-grid" id="grid"></div>';
      C.renderCardGrid(document.getElementById("grid"), titles);
    }
  }

  if (page === "profile") {
    var profile = S.getProfile();
    setTitle("Profile", "demo profile .");
    document.getElementById("page-content").innerHTML =
      '<div class="profile-header"><div class="profile-avatar-lg">' + C.escapeHtml(profile.avatar || "G") + '</div><div>' +
      '<h2>' + C.escapeHtml(profile.name) + '</h2><p class="text-secondary">Demo profile · data stays on this device</p>' +
      '<div class="profile-stats">' +
      '<div class="profile-stat"><div class="value">' + S.getMyList().length + '</div><div class="label">My List</div></div>' +
      '<div class="profile-stat"><div class="value">' + S.getFavorites().length + '</div><div class="label">Favorites</div></div>' +
      '<div class="profile-stat"><div class="value">' + S.getHistory().length + '</div><div class="label">History</div></div>' +
      '</div></div></div>' +
      '<div class="form-group"><label for="pname">Display name</label><input id="pname" type="text" value="' + C.escapeHtml(profile.name) + '" maxlength="40"></div>' +
      '<button type="button" class="btn btn-primary" id="save-profile">Save profile</button>';
    document.getElementById("save-profile").addEventListener("click", function () {
      var name = document.getElementById("pname").value.trim() || "Guest Viewer";
      S.saveProfile({ name: name, avatar: name.charAt(0).toUpperCase() });
      location.reload();
    });
  }

  if (page === "account") {
    setTitle("Account", "This is a local demo account. No real authentication is connected.");
    document.getElementById("page-content").innerHTML =
      '<div class="settings-section"><h3>Demo data</h3>' +
      '<p class="text-secondary" style="margin-bottom:var(--space-4)">Clear lists, history, and preferences stored in this browser.</p>' +
      '<button type="button" class="btn btn-secondary" id="reset-data">Reset all demo data</button></div>';
    document.getElementById("reset-data").addEventListener("click", function () {
      if (confirm("Reset all local demo data? This cannot be undone.")) {
        S.resetAllData();
        alert("Demo data cleared.");
        location.href = C.pageUrl("home");
      }
    });
  }

  if (page === "settings") {
    var prefs = S.getPreferences();
    setTitle("Settings", "Playback and accessibility preferences (stored locally).");
    document.getElementById("page-content").innerHTML =
      '<div class="settings-section"><h3>Playback</h3>' +
      '<div class="preference-row"><label for="autoplay">Autoplay next episode (demo)</label>' +
      '<button type="button" class="toggle ' + (prefs.autoplayTrailers ? "is-on" : "") + '" id="autoplay" role="switch"></button></div>' +
      '<div class="preference-row"><label for="subs">Prefer subtitles</label>' +
      '<button type="button" class="toggle ' + (prefs.subtitles ? "is-on" : "") + '" id="subs" role="switch"></button></div></div>' +
      '<div class="settings-section"><h3>Accessibility</h3>' +
      '<div class="preference-row"><label>Reduced motion is controlled by your system settings</label>' +
      '<span class="text-muted text-sm">' + (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "On" : "Off") + '</span></div></div>';
    function wireToggle(id, key) {
      var el = document.getElementById(id);
      el.addEventListener("click", function () {
        var on = !el.classList.contains("is-on");
        el.classList.toggle("is-on", on);
        var o = {}; o[key] = on; S.savePreferences(o);
      });
    }
    wireToggle("autoplay", "autoplayTrailers");
    wireToggle("subs", "subtitles");
  }

  if (page === "notifications") {
    setTitle("Notifications", "Updates and activity on this device.");
    var content = document.getElementById("page-content");
    var list = S.getNotifications();
    if (!list.length) {
      content.innerHTML = '<div class="empty-state"><h3>No notifications</h3><p>You are all caught up.</p></div>';
    } else {
      content.innerHTML = '<div style="margin-bottom:var(--space-4)"><button type="button" class="btn btn-secondary btn-sm" id="clear-n">Clear all</button></div><div class="notification-list" id="nl"></div>';
      var nl = document.getElementById("nl");
      list.forEach(function (n) {
        var div = document.createElement("div");
        div.className = "notification-item" + (n.read ? "" : " is-unread");
        div.style.cssText = "padding:14px 16px;border:1px solid var(--color-border);border-radius:10px;margin-bottom:10px;background:var(--color-bg-elevated)";
        div.innerHTML = "<strong style=\"display:block;margin-bottom:4px\">" + C.escapeHtml(n.title) + "</strong>" +
          "<p style=\"margin:0 0 6px;color:var(--color-text-secondary);font-size:0.9rem\">" + C.escapeHtml(n.body || "") + "</p>" +
          "<span style=\"font-size:0.75rem;color:var(--color-text-muted)\">" + C.escapeHtml(n.time || "") + "</span>";
        div.addEventListener("click", function () {
          if (S.markNotificationRead) S.markNotificationRead(n.id);
          div.classList.remove("is-unread");
        });
        nl.appendChild(div);
      });
      document.getElementById("clear-n").addEventListener("click", function () {
        if (S.clearNotifications) S.clearNotifications();
        content.innerHTML = '<div class="empty-state"><h3>No notifications</h3></div>';
      });
    }
  }

  if (page === "help") {
    setTitle("Help Center", "Common questions about this demo platform.");
    document.getElementById("page-content").innerHTML =
      '<div class="prose"><h2>Getting started</h2><p>Cineva help line.</p>' +
      '<h2>My List and favorites</h2><p>Your lists are stored sucessfully</p>' +
      '<h2>Search</h2><p>Use the search button in the header or press Ctrl/Cmd+K.</p></div>';
  }

  if (page === "about") {
    setTitle("About Cineva", "A premium movie discovery frontend built with HTML, CSS, and vanilla JavaScript.");
    document.getElementById("page-content").innerHTML =
      '<div class="prose"><p>Cineva is a portfolio-grade streaming interface. It does not stream copyrighted content and does not connect to a backend.</p>' +
      '<p>All movie metadata is illustrative. Progress and lists are stored only on your device.</p></div>';
  }

  if (page === "contact") {
    setTitle("Contact", "Messages sent to a server.");
    document.getElementById("page-content").innerHTML =
      '<div class="contact-grid"><div><div class="contact-info-item">' + C.icon("info") +
      '<div><strong>Demo only</strong><p class="text-secondary">Fill in the form below</p></div></div></div>' +
      '<form id="contact-form"><div class="form-group"><label for="cname">Name</label><input id="cname" required maxlength="80"></div>' +
      '<div class="form-group"><label for="cemail">Email</label><input id="cemail" type="email" required></div>' +
      '<div class="form-group"><label for="cmsg">Message</label><textarea id="cmsg" rows="5" required maxlength="1000"></textarea></div>' +
      '<button type="submit" class="btn btn-primary">Send message</button>' +
      '<p id="contact-status" class="text-muted" style="margin-top:var(--space-3)" hidden></p></form></div>';
    document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("contact-status");
      status.hidden = false;
      status.textContent = "Thanks. .";
      e.target.reset();
    });
  }

  if (page === "privacy") {
    setTitle("Privacy Policy", "");
    document.getElementById("page-content").innerHTML =
      '<div class="prose"><p>Details saved successfully.</p></div>';
  }

  if (page === "terms") {
    setTitle("Terms of Service", "");
    document.getElementById("page-content").innerHTML =
      '<div class="prose"><p>Cineva is provides movies both translated and non translated</p></div>';
  }

  if (page === "not-found") {
    setTitle("", "");
    document.getElementById("page-content").innerHTML =
      '<div class="not-found"><div class="code">404</div><h1>Page not found</h1><p>The page you requested does not exist.</p>' +
      '<a href="' + C.pageUrl("home") + '" class="btn btn-primary">Back to Home</a></div>';
  }
})();
