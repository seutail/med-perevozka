(() => {
  const root = document.querySelector("[data-slider]");
  if (!root) return;

  const sliderSection = root.closest(".hero-slider");
  const slides = Array.from(root.querySelectorAll("[data-slide]"));
  if (slides.length <= 1) return;

  const prevBtn = document.querySelector(".hero-slider__nav--prev");
  const nextBtn = document.querySelector(".hero-slider__nav--next");

  let index = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  if (index === -1) index = 0;

  const syncActiveAttr = () => {
    sliderSection?.setAttribute("data-active-slide", String(index + 1));
  };

  const setActive = (next) => {
    const nextIndex = ((next % slides.length) + slides.length) % slides.length;
    if (nextIndex === index) return;
    slides[index].classList.remove("is-active");
    slides[nextIndex].classList.add("is-active");
    index = nextIndex;
    syncActiveAttr();
  };

  syncActiveAttr();

  prevBtn?.addEventListener("click", () => setActive(index - 1));
  nextBtn?.addEventListener("click", () => setActive(index + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setActive(index - 1);
    if (e.key === "ArrowRight") setActive(index + 1);
  });
})();

