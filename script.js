document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling navigation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease";
    observer.observe(el);
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(26, 31, 58, 0.98)";
    } else {
      navbar.style.background = "rgba(26, 31, 58, 0.95)";
    }
  });
});

// Photo Gallery Functionality
const photos = [
  {
    src: "flower.jpg",
    alt: "遊戲主畫面",
  },
  {
    src: "https://via.placeholder.com/600x338/00d4aa/ffffff?text=角色介紹",
    alt: "角色介紹",
  },
  {
    src: "https://via.placeholder.com/600x338/ff6b6b/ffffff?text=關卡場景",
    alt: "關卡場景",
  },
  {
    src: "https://via.placeholder.com/600x338/f093fb/ffffff?text=戰鬥畫面",
    alt: "戰鬥畫面",
  },
  {
    src: "https://via.placeholder.com/600x338/667eea/ffffff?text=技能系統",
    alt: "技能系統",
  },
];

let currentPhotoIndex = 0;

// Change main photo when clicking thumbnail
function changeMainPhoto(thumbnail) {
  const mainPhoto = document.getElementById("mainPhoto");
  const img = thumbnail.querySelector("img");

  // Update main photo
  mainPhoto.src = img.src.replace("150x84", "600x338");
  mainPhoto.alt = img.alt;

  // Update active thumbnail
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
  });
  thumbnail.classList.add("active");

  // Update current index for lightbox
  currentPhotoIndex = Array.from(
    document.querySelectorAll(".thumbnail")
  ).indexOf(thumbnail);

  // Add animation effect
  mainPhoto.style.opacity = "0";
  setTimeout(() => {
    mainPhoto.style.opacity = "1";
  }, 150);
}

// Open lightbox
function openLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const mainPhoto = document.getElementById("mainPhoto");

  lightboxImage.src = mainPhoto.src;
  lightboxImage.alt = mainPhoto.alt;
  lightbox.style.display = "block";

  // Prevent body scrolling
  document.body.style.overflow = "hidden";

  // Add animation
  lightbox.style.opacity = "0";
  setTimeout(() => {
    lightbox.style.opacity = "1";
  }, 10);
}

// Close lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");

  lightbox.style.opacity = "0";
  setTimeout(() => {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

// Navigate to previous photo in lightbox
function previousPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  updateLightboxPhoto();
  updateActiveThumbnail();
}

// Navigate to next photo in lightbox
function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  updateLightboxPhoto();
  updateActiveThumbnail();
}

// Update lightbox photo
function updateLightboxPhoto() {
  const lightboxImage = document.getElementById("lightboxImage");
  const mainPhoto = document.getElementById("mainPhoto");

  lightboxImage.style.opacity = "0";
  setTimeout(() => {
    lightboxImage.src = photos[currentPhotoIndex].src;
    lightboxImage.alt = photos[currentPhotoIndex].alt;
    mainPhoto.src = photos[currentPhotoIndex].src;
    mainPhoto.alt = photos[currentPhotoIndex].alt;
    lightboxImage.style.opacity = "1";
  }, 150);
}

// Update active thumbnail
function updateActiveThumbnail() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb, index) => {
    if (index === currentPhotoIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

// Close lightbox when clicking outside image
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
});

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox && lightbox.style.display === "block") {
    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        previousPhoto();
        break;
      case "ArrowRight":
        nextPhoto();
        break;
    }
  }
});
