// Age gate: remembered per browser; storage may be unavailable (private mode)
const AGE_KEY = "mm-age-ok";
const gate = document.getElementById("age-gate");
let ageOk = false;
try {
  ageOk = localStorage.getItem(AGE_KEY) === "1";
} catch {}
if (gate && !ageOk) {
  gate.hidden = false;
  document.body.classList.add("locked");
  gate.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-age]");
    if (!btn) return;
    if (btn.dataset.age === "yes") {
      try {
        localStorage.setItem(AGE_KEY, "1");
      } catch {}
      gate.hidden = true;
      document.body.classList.remove("locked");
    } else {
      const msg = gate.querySelector("p")!;
      msg.textContent = msg.dataset.denied ?? "";
      msg.classList.add("age-denied");
      gate.querySelector(".age-actions")?.remove();
    }
  });
}

// Header shadow once scrolled past the top
const header = document.querySelector<HTMLElement>(".site-header")!;
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const toggle = header.querySelector<HTMLButtonElement>(".nav-toggle")!;
toggle.addEventListener("click", () => {
  const open = header.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(open));
});
header.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }),
);

// Product filter (shop page); the active category lives in ?kategori= (Danish) or ?category= (English)
const catParam = document.documentElement.lang === "en" ? "category" : "kategori";
const filters = document.querySelectorAll<HTMLButtonElement>(".filter");
const count = document.getElementById("count");
const applyFilter = (cat: string) => {
  let shown = 0;
  filters.forEach((b) => b.classList.toggle("active", b.dataset.filter === cat));
  document.querySelectorAll<HTMLElement>(".product-grid .pcard").forEach((p) => {
    p.hidden = cat !== "all" && p.dataset.cat !== cat;
    if (!p.hidden) shown++;
  });
  if (count) count.textContent = String(shown);
};
if (filters.length) {
  const initial = new URLSearchParams(location.search).get(catParam);
  if (initial && [...filters].some((b) => b.dataset.filter === initial)) applyFilter(initial);
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter!;
      applyFilter(cat);
      const url = new URL(location.href);
      if (cat === "all") url.searchParams.delete(catParam);
      else url.searchParams.set(catParam, cat);
      history.replaceState(null, "", url);
    }),
  );
}

// Carousel arrows scroll their rail by one visible page
document.querySelectorAll<HTMLButtonElement>(".rail-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    const rail = document.getElementById(btn.dataset.rail!);
    if (rail) rail.scrollBy({ left: Number(btn.dataset.dir) * rail.clientWidth * 0.9, behavior: "smooth" });
  }),
);

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
