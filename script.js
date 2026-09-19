const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const scrollArt = document.querySelectorAll("[data-scroll-art]");
const customCursor = document.querySelector("[data-cursor]");
const cursorTrail = document.querySelector("[data-cursor-trail]");
const preloader = document.querySelector("[data-preloader]");
const siteTrailCanvas = document.querySelector("[data-site-trail]");
const typewriter = document.querySelector("[data-typewriter]");
const navLinks = document.querySelectorAll("[data-nav-link]");

document.body.classList.add("is-loading");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

const initPreloader = () => {
  if (!preloader) {
    document.body.classList.remove("is-loading");
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    preloader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
    return;
  }

  window.setTimeout(() => {
    preloader.classList.add("is-exiting");
    window.setTimeout(() => {
      preloader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
    }, 820);
  }, 1850);
};

initPreloader();

const initHeroTypewriter = () => {
  if (!typewriter) return;

  const words = ["Branding", "Web Design", "UI/UX", "Content Creation", "Campaigns", "Social Media", "Events"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const word = words[wordIndex];
    typewriter.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
      charIndex += 1;
      window.setTimeout(tick, 78);
      return;
    }

    if (!deleting && charIndex === word.length) {
      deleting = true;
      window.setTimeout(tick, 980);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(tick, 28);
      return;
    }

    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    window.setTimeout(tick, 180);
  };

  tick();
};

initHeroTypewriter();

const initSiteTrail = () => {
  if (!siteTrailCanvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = siteTrailCanvas.getContext("2d");
  if (!ctx) return;

  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const lines = Array.from({ length: 26 }, (_, lineIndex) =>
    Array.from({ length: 30 }, () => ({
      x: pointer.x,
      y: pointer.y,
      vx: 0,
      vy: 0,
      spring: 0.15 + lineIndex * 0.002,
    }))
  );
  const trailColors = [
    "rgba(195, 169, 135, 0.034)",
    "rgba(207, 166, 160, 0.03)",
    "rgba(184, 167, 185, 0.026)",
    "rgba(255, 250, 244, 0.024)",
  ];

  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    siteTrailCanvas.width = Math.floor(window.innerWidth * ratio);
    siteTrailCanvas.height = Math.floor(window.innerHeight * ratio);
    siteTrailCanvas.style.width = `${window.innerWidth}px`;
    siteTrailCanvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const movePointer = (event) => {
    const touch = event.touches?.[0];
    pointer.x = touch ? touch.clientX : event.clientX;
    pointer.y = touch ? touch.clientY : event.clientY;
  };

  const renderTrail = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.globalCompositeOperation = "lighter";
    lines.forEach((nodes, lineIndex) => {
      let spring = nodes[0].spring;
      nodes.forEach((node, nodeIndex) => {
        const target = nodeIndex === 0 ? pointer : nodes[nodeIndex - 1];
        node.vx += (target.x - node.x) * spring;
        node.vy += (target.y - node.y) * spring;
        node.vx *= 0.52;
        node.vy *= 0.52;
        node.x += node.vx;
        node.y += node.vy;
        spring *= 0.985;
      });

      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length - 2; i += 1) {
        const xc = (nodes[i].x + nodes[i + 1].x) / 2;
        const yc = (nodes[i].y + nodes[i + 1].y) / 2;
        ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
      }
      ctx.lineWidth = 5.5;
      ctx.strokeStyle = trailColors[lineIndex % trailColors.length];
      ctx.stroke();
    });

    requestAnimationFrame(renderTrail);
  };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", movePointer, { passive: true });
  window.addEventListener("touchmove", movePointer, { passive: true });
  requestAnimationFrame(renderTrail);
};

initSiteTrail();

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
  scrollTopButton?.classList.toggle("is-visible", window.scrollY > 520);
  const activeSection = [...navLinks]
    .map((link) => {
      const href = link.getAttribute("href");
      return href === "#top" ? document.querySelector(".hero") : document.querySelector(href);
    })
    .filter(Boolean)
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= 160);
  if (activeSection) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isHero = activeSection.classList.contains("hero");
      link.classList.toggle("is-active", isHero ? href === "#top" : href === `#${activeSection.id}`);
    });
  }
  const viewportHeight = window.innerHeight || 1;
  scrollArt.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const progress = 1 - rect.top / viewportHeight;
    element.style.setProperty("--scroll-progress", Math.min(1.4, Math.max(-0.4, progress)).toFixed(3));
  });
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", setHeaderState);

toggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.toggle("is-active", item === link));
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  });
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim() || "there";
  const subject = encodeURIComponent("New project enquiry for Deszayners Studio");
  const body = encodeURIComponent(
    `Hi Deszayners Studio,\n\nI'm ${name}.\n\nProject type: ${form.elements.project.value}\n\n${form.elements.message.value}\n\nReply to: ${form.elements.email.value}`
  );
  window.location.href = `mailto:deszayn.co@gmail.com?subject=${subject}&body=${body}`;
});

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const initLuxuryCursor = () => {
  const canUseCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!customCursor || !cursorTrail || !canUseCursor || prefersReducedMotion) return;

  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const cursor = { x: pointer.x, y: pointer.y };
  const trail = { x: pointer.x, y: pointer.y };

  const setHoverState = (target) => {
    const interactive = target.closest("a, button, input, select, textarea, label");
    document.body.classList.toggle("cursor-hover", Boolean(interactive));
  };

  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    document.body.classList.add("cursor-ready");
    setHoverState(event.target);
  });

  window.addEventListener("pointerdown", () => document.body.classList.add("cursor-down"));
  window.addEventListener("pointerup", () => document.body.classList.remove("cursor-down"));
  window.addEventListener("pointerleave", () => document.body.classList.remove("cursor-ready"));
  window.addEventListener("pointerenter", () => document.body.classList.add("cursor-ready"));

  const render = () => {
    cursor.x += (pointer.x - cursor.x) * 0.24;
    cursor.y += (pointer.y - cursor.y) * 0.24;
    trail.x += (pointer.x - trail.x) * 0.1;
    trail.y += (pointer.y - trail.y) * 0.1;

    const dx = pointer.x - cursor.x;
    const dy = pointer.y - cursor.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const stretch = Math.min(1.28, 1 + Math.hypot(dx, dy) / 520);

    const isHovering = document.body.classList.contains("cursor-hover");
    const isDown = document.body.classList.contains("cursor-down");
    const cursorSize = isHovering ? 18 : 12;
    const ringSize = isHovering ? 38 : 34;
    const clickScale = isDown ? 0.78 : 1;

    customCursor.style.transform = `translate3d(${cursor.x - cursorSize / 2}px, ${cursor.y - cursorSize / 2}px, 0) scale(${clickScale})`;
    cursorTrail.style.transform = `translate3d(${trail.x - ringSize / 2}px, ${trail.y - ringSize / 2}px, 0) scale(${isDown ? 0.9 : 1})`;
    requestAnimationFrame(render);
  };

  render();
};

initLuxuryCursor();

const artObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.style.setProperty("--reveal-progress", entry.isIntersecting ? "1" : "0");
    });
  },
  { threshold: 0.15 }
);

scrollArt.forEach((element) => artObserver.observe(element));
requestAnimationFrame(setHeaderState);
