const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];
const glow = document.querySelector(".cursor-glow");
const copyButton = document.querySelector(".copy-email");
const year = document.querySelector("#current-year");

year.textContent = new Date().getFullYear();

const closeNav = () => {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeNav));

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);

    let currentSection = sections
      .filter((section) => window.scrollY >= section.offsetTop - 180)
      .at(-1);

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
      currentSection = sections.at(-1);
    }

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${currentSection?.id}`);
    });
  },
  { passive: true }
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

window.addEventListener(
  "pointermove",
  (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  },
  { passive: true }
);

copyButton.addEventListener("click", async () => {
  const label = copyButton.querySelector(".copy-label");

  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    label.textContent = "Email copied";
    copyButton.classList.add("is-copied");
  } catch {
    label.textContent = copyButton.dataset.email;
  }

  window.setTimeout(() => {
    label.textContent = "Copy email";
    copyButton.classList.remove("is-copied");
  }, 2200);
});
