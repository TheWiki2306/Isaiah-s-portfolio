document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Hamburger
const menu = document.getElementById("menu");
const show = document.querySelector(".show");
const listItems = document.querySelectorAll(".list-item");
const closeBtn = document.getElementById("close");

menu.addEventListener("click", () => {
  show.style.display = "block";
});

listItems.forEach((listItem) => {
  listItem.addEventListener("click", () => {
    show.style.display = "none";
  });
});

closeBtn.addEventListener("click", () => {
  show.style.display = "none";
});

document.addEventListener("click", (event) => {
  const isClickInsideMenu = show.contains(event.target);
  const isClickOnMenuButton = event.target === menu;

  if (!isClickInsideMenu && !isClickOnMenuButton) {
    show.style.display = "none";
  }
});

// Slider function
function initializeSlider(
  containerSelector,
  cardSelector,
  nextBtnSelector,
  prevBtnSelector,
  defaultCardsPerView
) {
  document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(containerSelector);
    const cards = document.querySelectorAll(cardSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    let currentIndex = 0;
    let cardsPerView = defaultCardsPerView;

    function updateCardsPerView() {
      if (window.innerWidth <= 768) {
        cardsPerView = 1;
      } else if (window.innerWidth <= 1024) {
        cardsPerView = 2;
      } else {
        cardsPerView = defaultCardsPerView;
      }
      updateSlider();
    }

    function updateSlider() {
      const cardWidth = 100 / cardsPerView;
      const offset = -currentIndex * cardWidth;
      slider.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener("click", () => {
      if (currentIndex < cards.length - cardsPerView) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = cards.length - cardsPerView;
      }
      updateSlider();
    });

    // Update cards per view on window resize
    window.addEventListener("resize", updateCardsPerView);

    // Initialize the slider and cards per view
    updateCardsPerView();
    updateSlider();
  });
}

initializeSlider(
  ".card-container-1",
  ".card-1",
  ".next-btn-1",
  ".prev-btn-1",
  3
);

initializeSlider(
  ".card-container-2",
  ".card-2",
  ".next-btn-2",
  ".prev-btn-2",
  3
);

// Form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      message: document.getElementById("message").value,
    };

    const successMessage = document.getElementById("success");
    const failure = document.getElementById("not-sent");

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        successMessage.style.display = "flex";

        document.getElementById("contact-form").reset();

        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      } else {
        failure.style.display = "flex";
        alert("Form submission failed. Please try again.");

        setTimeout(() => {
          failure.style.display = "none";
        }, 1000);
      }
    } catch (error) {
      failure.style.display = "flex";

      console.error("Error: " + error);
      alert("An error occurred. Please try again.");

      setTimeout(() => {
        failure.style.display = "none";
      }, 3000);
    }
  });

// Read more
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-2");

  cards.forEach((card) => {
    const unhide = card.querySelector(".unhide");
    const moreButton = card.querySelector(".more");

    if (unhide && moreButton) {
      moreButton.addEventListener("click", () => {
        if (unhide.style.display === "none" || unhide.style.display === "") {
          unhide.style.display = "block";
          moreButton.textContent = "Read Less";
        } else {
          unhide.style.display = "none";
          moreButton.textContent = "Read More";
        }
      });
    }
  });
});
