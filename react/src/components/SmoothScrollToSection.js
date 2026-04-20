let activeScrollFrame = null;

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export default function smoothScrollToSection(
  sectionId,
  { duration = 950, offset = 64 } = {}
) {
  const element = document.getElementById(sectionId);

  if (!element) {
    return;
  }

  const startY = window.scrollY;
  const targetY = Math.max(
    element.getBoundingClientRect().top + window.scrollY - offset,
    0
  );
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  const startTime = performance.now();

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      activeScrollFrame = requestAnimationFrame(step);
    } else {
      activeScrollFrame = null;
    }
  };

  if (activeScrollFrame) {
    cancelAnimationFrame(activeScrollFrame);
  }

  activeScrollFrame = requestAnimationFrame(step);
}