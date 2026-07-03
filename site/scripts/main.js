const motolifeSlides = [
  {
    key: "sport",
    label: "Спорт",
    alt: "Спортбайк",
    main: "site/img/bike-sport.png",
    left: "site/img/bike-enduro.png",
    right: "site/img/bike-chopper.png",
  },
  {
    key: "enduro",
    label: "Эндуро",
    alt: "Эндуро",
    main: "site/img/bike-enduro.png",
    left: "site/img/bike-chopper.png",
    right: "site/img/bike-sport.png",
  },
  {
    key: "chopper",
    label: "Чопперы",
    alt: "Чоппер",
    main: "site/img/bike-chopper.png",
    left: "site/img/bike-sport.png",
    right: "site/img/bike-enduro.png",
  },
];

const hero = document.querySelector("#motolifeHero");

if (hero) {
  const bikeMain = hero.querySelector("#bikeMain");
  const bikeLeft = hero.querySelector("#bikeLeft");
  const bikeRight = hero.querySelector("#bikeRight");

  const prevButton = hero.querySelector(".motolife-hero__arrow--prev");
  const nextButton = hero.querySelector(".motolife-hero__arrow--next");
  const thumbButtons = [...hero.querySelectorAll(".motolife-hero__thumb")];
  const progressItems = [...hero.querySelectorAll(".motolife-hero__progress span")];

  let activeIndex = 0;
  let isAnimating = false;

  const preloadImages = () => {
    motolifeSlides.forEach((slide) => {
      [slide.main, slide.left, slide.right].forEach((src) => {
        const image = new Image();
        image.src = src;
      });
    });
  };

  const setActiveClasses = (index) => {
    thumbButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });

    progressItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
    });
  };

  const changeSlide = (index) => {
    if (isAnimating || index === activeIndex) return;

    isAnimating = true;
    activeIndex = (index + motolifeSlides.length) % motolifeSlides.length;

    const slide = motolifeSlides[activeIndex];

    bikeMain.classList.add("is-changing");
    bikeLeft.style.opacity = "0";
    bikeRight.style.opacity = "0";

    window.setTimeout(() => {
      bikeMain.src = slide.main;
      bikeMain.alt = slide.alt;

      bikeLeft.src = slide.left;
      bikeRight.src = slide.right;

      setActiveClasses(activeIndex);

      bikeMain.classList.remove("is-changing");
      bikeLeft.style.opacity = "";
      bikeRight.style.opacity = "";
    }, 240);

    window.setTimeout(() => {
      isAnimating = false;
    }, 520);
  };

  thumbButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.slide);
      changeSlide(index);
    });
  });

  prevButton?.addEventListener("click", () => {
    changeSlide(activeIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    changeSlide(activeIndex + 1);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") changeSlide(activeIndex - 1);
    if (event.key === "ArrowRight") changeSlide(activeIndex + 1);
  });

  let touchStartX = 0;

  hero.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  hero.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) < 50) return;

      if (diff > 0) {
        changeSlide(activeIndex + 1);
      } else {
        changeSlide(activeIndex - 1);
      }
    },
    { passive: true }
  );

  preloadImages();
}

const burgerButton = document.querySelector(".motolife-header__burger");
const mobileMenu = document.querySelector("#motolifeMenu");
const menuCloseItems = document.querySelectorAll("[data-menu-close]");
const menuLinks = document.querySelectorAll(".motolife-menu__nav a, .motolife-menu__request");

const openMobileMenu = () => {
  if (!burgerButton || !mobileMenu) return;

  burgerButton.classList.add("is-active");
  burgerButton.setAttribute("aria-expanded", "true");

  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");

  document.body.classList.add("menu-open");
};

const closeMobileMenu = () => {
  if (!burgerButton || !mobileMenu) return;

  burgerButton.classList.remove("is-active");
  burgerButton.setAttribute("aria-expanded", "false");

  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");

  document.body.classList.remove("menu-open");
};

burgerButton?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.contains("is-open");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

menuCloseItems.forEach((item) => {
  item.addEventListener("click", closeMobileMenu);
});

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});
