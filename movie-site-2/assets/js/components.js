/**
 * CINEVA – Shared UI components and helpers
 * Works with file:// (no ES modules). Depends on CinevaData + CinevaStorage.
 */

const icons = {
  play: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  heartFilled: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>`,
  film: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
};

function icon(name) {
  return icons[name] || "";
}

function basePath() {
  var path = (window.location.pathname || "") + " " + (window.location.href || "");
  if (path.indexOf("/pages/") !== -1 || path.indexOf("\\pages\\") !== -1) return "../";
  try {
    var parts = window.location.href.split("/");
    if (parts.length > 1 && parts[parts.length - 2] === "pages") return "../";
  } catch (e) {}
  return "./";
}

function pageUrl(page) {
  const base = basePath();
  if (page === "index" || page === "home") return base + "index.html";
  return base + "pages/" + page + ".html";
}

function detailsUrl(title) {
  const base = basePath();
  const page = "series-details";
  if (title.type === "movie") return base + "pages/movie-details.html?id=" + encodeURIComponent(title.id);
  return base + "pages/series-details.html?id=" + encodeURIComponent(title.id);
}

function watchUrl(title, episode) {
  const base = basePath();
  let url = base + "pages/watch.html?id=" + encodeURIComponent(title.id);
  if (episode) url += "&ep=" + episode.season + "-" + episode.number;
  return url;
}

let toastContainer = null;

function showToast(message, duration) {
  duration = duration || 2800;
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    toastContainer.setAttribute("role", "status");
    toastContainer.setAttribute("aria-live", "polite");
    document.body.appendChild(toastContainer);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  toastContainer.appendChild(el);
  setTimeout(function () {
    el.classList.add("is-leaving");
    setTimeout(function () { el.remove(); }, 200);
  }, duration);
}

function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function genreName(id) {
  const map = {
    action: "Action", adventure: "Adventure", animation: "Animation",
    comedy: "Comedy", crime: "Crime", documentary: "Documentary",
    drama: "Drama", fantasy: "Fantasy", horror: "Horror",
    romance: "Romance", scifi: "Science Fiction", thriller: "Thriller"
  };
  return map[id] || id;
}

function createMovieCard(title, options) {
  options = options || {};
  const S = window.CinevaStorage;
  const inList = S.isInMyList(title.id);
  const fav = S.isFavorite(title.id);
  const progress = options.showProgress ? S.getProgressFor(title.id) : null;
  const typeLabel = title.type === "series" ? "Series" : title.type === "anime" ? "Anime" : "Movie";

  const card = document.createElement("article");
  card.className = "movie-card";
  card.dataset.id = title.id;

  const progressHtml = progress && progress.percent > 0
    ? '<div class="movie-card-progress" aria-hidden="true"><div class="movie-card-progress-bar" style="width:' + progress.percent + '%"></div></div>'
    : "";

  card.innerHTML =
    '<a href="' + detailsUrl(title) + '" class="movie-card-poster" aria-label="' + escapeHtml(title.title) + '">' +
      '<img src="' + title.poster + '" alt="" loading="lazy" width="400" height="600" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
      '<div class="fallback" style="display:none">' + escapeHtml(title.title) + '<br><small>' + typeLabel + '</small></div>' +
      progressHtml +
    '</a>' +
    '<div class="movie-card-actions">' +
      '<button type="button" class="movie-card-action list-btn ' + (inList ? "is-active" : "") + '" data-id="' + title.id + '" aria-label="' + (inList ? "Remove from My List" : "Add to My List") + '">' +
        (inList ? icon("check") : icon("plus")) +
      '</button>' +
      '<button type="button" class="movie-card-action fav-btn ' + (fav ? "is-active" : "") + '" data-id="' + title.id + '" aria-label="' + (fav ? "Remove from favorites" : "Add to favorites") + '">' +
        (fav ? icon("heartFilled") : icon("heart")) +
      '</button>' +
    '</div>' +
    '<div class="movie-card-body">' +
      '<h3 class="movie-card-title truncate"><a href="' + detailsUrl(title) + '">' + escapeHtml(title.title) + '</a></h3>' +
      '<div class="movie-card-meta">' +
        '<span>' + title.year + '</span>' +
        '<span class="movie-card-rating">' + icon("star") + ' ' + title.rating.toFixed(1) + '</span>' +
        '<span>' + typeLabel + '</span>' +
      '</div>' +
    '</div>';

  const listBtn = card.querySelector(".list-btn");
  const favBtn = card.querySelector(".fav-btn");

  listBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!S.isSignedIn()) {
      if (window.CinevaApp && window.CinevaApp.openSignInModal) window.CinevaApp.openSignInModal("Sign in to add to your Watchlist / My List.");
      else showToast("Please sign in to add to My List");
      return;
    }
    const nowIn = S.toggleMyList(title.id);
    if (S.syncListCounts) S.syncListCounts();
    listBtn.classList.toggle("is-active", nowIn);
    listBtn.innerHTML = nowIn ? icon("check") : icon("plus");
    listBtn.setAttribute("aria-label", nowIn ? "Remove from My List" : "Add to My List");
    showToast(nowIn ? 'Added "' + title.title + '" to My List' : "Removed from My List");
  });

  favBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!S.isSignedIn()) {
      if (S.recordMovieLike) S.recordMovieLike(title.id, title.vj || null);
      showToast("Liked! Sign in to save this to your Favourites.", 3200);
      return;
    }
    const nowFav = S.toggleFavorite(title.id);
    if (S.syncListCounts) S.syncListCounts();
    if (nowFav && S.recordMovieLike) S.recordMovieLike(title.id, title.vj || null);
    favBtn.classList.toggle("is-active", nowFav);
    favBtn.innerHTML = nowFav ? icon("heartFilled") : icon("heart");
    favBtn.setAttribute("aria-label", nowFav ? "Remove from favorites" : "Add to favorites");
    showToast(nowFav ? "Added to favorites" : "Removed from favorites");
  });

  return card;
}

function renderCardGrid(container, titles, options) {
  if (!container) return;
  container.innerHTML = "";
  if (!titles.length) {
    container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><h3>No titles found</h3><p>Try adjusting your filters or browse the full catalog.</p><a href="' + pageUrl("explore") + '" class="btn btn-primary">Explore</a></div>';
    return;
  }
  titles.forEach(function (t) {
    container.appendChild(createMovieCard(t, options));
  });
}

function renderCarousel(container, titles, options) {
  if (!container) return;
  const track = container.querySelector(".carousel-track") || container;
  track.innerHTML = "";
  titles.forEach(function (t) {
    track.appendChild(createMovieCard(t, options));
  });
}

function initCarousels() {
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var prev = carousel.querySelector(".carousel-btn.prev");
    var next = carousel.querySelector(".carousel-btn.next");
    if (!track) return;
    if (prev && !prev.innerHTML.trim()) prev.innerHTML = icon("chevronLeft");
    if (next && !next.innerHTML.trim()) next.innerHTML = icon("chevronRight");
    function scrollAmount() {
      return Math.min(track.clientWidth * 0.75, 640);
    }
    if (prev) {
      prev.onclick = function () {
        track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
      };
    }
    if (next) {
      next.onclick = function () {
        track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
      };
    }
  });
}

function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) header.classList.add("is-compact");
    else header.classList.remove("is-compact");
  }, { passive: true });
}

function initMobileNav() {
  const btn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".mobile-nav-close");
  if (!btn || !nav) return;
  function open() {
    nav.classList.add("is-open");
    document.body.style.overflow = "hidden";
    btn.setAttribute("aria-expanded", "true");
  }
  function close() {
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
    btn.setAttribute("aria-expanded", "false");
  }
  btn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", close);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) close();
  });
}

function setActiveNav() {
  const path = window.location.pathname || window.location.href;
  document.querySelectorAll(".nav-link, .mobile-nav-links a").forEach(function (link) {
    const href = link.getAttribute("href") || "";
    if (href && path.indexOf(href.replace("../", "").replace("./", "")) !== -1) {
      link.classList.add("is-active");
    }
  });
}

function recordView(titleId) {
  if (!titleId) return;
  window.CinevaStorage.addToHistory(titleId);
  var t = window.CinevaData && window.CinevaData.getTitleById ? window.CinevaData.getTitleById(titleId) : null;
  var vj = t && t.vj ? t.vj : null;
  if (window.CinevaStorage.recordMovieView) window.CinevaStorage.recordMovieView(titleId, vj);
}

window.CinevaComponents = {
  icons: icons,
  icon: icon,
  basePath: basePath,
  pageUrl: pageUrl,
  detailsUrl: detailsUrl,
  watchUrl: watchUrl,
  showToast: showToast,
  escapeHtml: escapeHtml,
  genreName: genreName,
  createMovieCard: createMovieCard,
  renderCardGrid: renderCardGrid,
  renderCarousel: renderCarousel,
  initCarousels: initCarousels,
  initHeader: initHeader,
  initMobileNav: initMobileNav,
  setActiveNav: setActiveNav,
  recordView: recordView
};
