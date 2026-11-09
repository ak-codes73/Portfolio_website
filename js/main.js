/* ==========================================================
   Aryan Kedar portfolio | main.js
   Edit the constants and POLICIES below. No HTML changes needed.
   ========================================================== */

/* ---------- Contact details (used everywhere on the site) ---------- */
const WHATSAPP_NUMBER = "917058868741";
const EMAIL = "ak.codes73@gmail.com";
const INSTAGRAM = "https://instagram.com/introvertguy_73";

/* ---------- Pre-filled WhatsApp messages, one per button context ---------- */
const WA_MESSAGES = {
  general: "Hi Aryan, I found your portfolio and I'd like to talk about a website for my business.",
  single: "Hi Aryan, I'd like a quote for a single-page website.",
  fullstack: "Hi Aryan, I'd like a quote for a full-stack website or online store.",
  extras: "Hi Aryan, I'd like to talk about extra features or support for my website.",
  policies: "Hi Aryan, I have a question about your policies."
};

/* ---------- Policies ---------- */
/* Edit these before going live.
   Add, remove or reword items freely. Each item needs a title and text.
   Text in [square brackets] is shown as "to be completed" on localhost only.
   If this array is empty, the whole Policies block is hidden. */
const POLICIES = [
  {
    title: "Payment terms",
    text: "50% to start the project, 50% on delivery. Final files and admin access are handed over after the final payment."
  },
  {
    title: "Revisions",
    text: "Includes 2 rounds of revisions. Extra rounds or major changes are quoted separately."
  },
  {
    title: "Timeline",
    text: "3-4 business days for single page and 7-8 business for full stack"
  },
  {
    title: "Hosting and domain",
    text: "For a custom domain the client has to pay according to their preference"
  },
  {
    title: "Cancellation and refunds",
    text: "Cancellation is allowed but no refund of 50% advance payment"
  },
  {
    title: "Support after delivery",
    text: "Free support for 3 months after launching"
  }
];

/* ==========================================================
   Code below: no need to edit
   ========================================================== */

document.documentElement.classList.add("js");

/** Build a wa.me link with a pre-filled message. */
function waLink(key) {
  const msg = WA_MESSAGES[key] || WA_MESSAGES.general;
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
}

/** True when running locally (used to flag unfinished policy text). */
function isDevelopment() {
  return ["localhost", "127.0.0.1", "", "[::1]"].includes(location.hostname) || location.protocol === "file:";
}

/* ---------- Contact links ---------- */
function setupContactLinks() {
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.setAttribute("href", waLink(el.dataset.wa));
  });

  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = "mailto:" + EMAIL;
    emailLink.textContent = EMAIL;
  }
  const igLink = document.getElementById("instagram-link");
  if (igLink) {
    igLink.href = INSTAGRAM;
  }
}

/* ---------- Mobile menu ---------- */
function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
}

/* ---------- Active nav link while scrolling ---------- */
function setupActiveNav() {
  const links = Array.from(document.querySelectorAll("a[data-nav]"));
  const sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if (!("IntersectionObserver" in window) || !sections.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        const active = a.getAttribute("href") === "#" + entry.target.id;
        a.classList.toggle("active", active);
        if (active) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
}

/* ---------- Scroll reveal ---------- */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { observer.observe(el); });
}

/* ---------- Project screenshots: show placeholder if image is missing ---------- */
function setupImageFallbacks() {
  document.querySelectorAll(".shot img").forEach(function (img) {
    function fail() { img.closest(".shot").classList.add("no-image"); }
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });
}

/* ---------- Policies accordion ---------- */
function renderPolicies() {
  const block = document.getElementById("policies");
  const list = document.getElementById("policies-list");
  if (!block || !list) return;

  if (!Array.isArray(POLICIES) || POLICIES.length === 0) {
    block.hidden = true;
    return;
  }

  const dev = isDevelopment();
  list.innerHTML = "";

  POLICIES.forEach(function (policy, i) {
    const item = document.createElement("div");
    item.className = "acc-item";

    const heading = document.createElement("h4");
    heading.style.margin = "0";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "acc-btn";
    btn.id = "policy-btn-" + i;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "policy-panel-" + i);

    const label = document.createElement("span");
    label.textContent = policy.title;

    // Flag unfinished [bracketed] text, development only
    if (dev && /\[[^\]]*\]/.test(policy.title + " " + policy.text)) {
      item.classList.add("is-todo");
      const flag = document.createElement("span");
      flag.className = "todo-flag";
      flag.textContent = "to be completed";
      label.appendChild(flag);
    }

    const icon = document.createElement("span");
    icon.className = "acc-icon";
    icon.setAttribute("aria-hidden", "true");

    btn.appendChild(label);
    btn.appendChild(icon);
    heading.appendChild(btn);

    const panel = document.createElement("div");
    panel.className = "acc-panel";
    panel.id = "policy-panel-" + i;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", btn.id);
    panel.hidden = true;
    panel.textContent = policy.text;

    btn.addEventListener("click", function () {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });

    item.appendChild(heading);
    item.appendChild(panel);
    list.appendChild(item);
  });

  block.hidden = false;
}

/* ---------- Work carousel ---------- */
function setupCarousel() {
  const track = document.getElementById("work-track");
  const prev = document.getElementById("work-prev");
  const next = document.getElementById("work-next");
  const dotsWrap = document.getElementById("work-dots");
  if (!track || !prev || !next || !dotsWrap) return;

  const cards = Array.from(track.children);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;

  // One dot per project
  const dots = cards.map(function (card, i) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Go to project " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    const index = Math.max(0, Math.min(cards.length - 1, i));
    track.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }

  function update() {
    // Current = the card whose left edge is closest to the scroll position
    const start = cards[0].offsetLeft;
    let best = 0, bestDist = Infinity;
    cards.forEach(function (card, i) {
      const d = Math.abs(card.offsetLeft - start - track.scrollLeft);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    current = best;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (atEnd) current = cards.length - 1;
    dots.forEach(function (dot, i) { dot.setAttribute("aria-selected", String(i === current)); });
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = atEnd;
  }

  prev.addEventListener("click", function () { goTo(current - 1); });
  next.addEventListener("click", function () { goTo(current + 1); });
  track.addEventListener("scroll", function () { window.requestAnimationFrame(update); }, { passive: true });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
  });
  window.addEventListener("resize", update);
  update();
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", function () {
  setupContactLinks();
  setupMenu();
  setupActiveNav();
  setupImageFallbacks();
  renderPolicies();
  setupCarousel();
  setupReveal();
});
