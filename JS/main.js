let bar = document.querySelector(".bar");
let close = document.querySelector(".close");
let navs = document.querySelectorAll("header ul li");
let nav = document.querySelector("header ul");
let loader = document.querySelector(".p1");
let pag = document.querySelector(".contentpage");
let but1 = document.querySelectorAll(
  "#packages > div.package.eco > div.mon > button",
);
let but2 = document.querySelectorAll(
  "#packages > div.package.pro > div.mon > button",
);
let but3 = document.querySelectorAll(
  "#packages > div.package.diamond > div.mon > button",
);
let but3_2 = document.querySelectorAll(
  "#packages > div.package.diamond > div.mon_pr > button",
);
let price = document.querySelectorAll("#packages > div.package > div.price");
let reviewTabs = document.querySelectorAll("#reviews .tab-btn");
let reviewGalleries = document.querySelectorAll("#reviews .review-gallery");
if (bar || close) {
  bar.addEventListener("click", () => {
    close.style.display = "block";
    // make mobile nav wider on very small screens
    nav.style.width = window.innerWidth <= 420 ? "100%" : "40%";
  });
  close.addEventListener("click", () => {
    close.style.display = "none";
    nav.style.width = "0%";
  });
  // ensure nav closes when window is resized larger
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.style.width = null;
      close.style.display = 'none';
    }
  });
}
prices(but1);
prices(but2);
function prices(a) {
  a.forEach((e) => {
    e.addEventListener("click", function () {
      a.forEach((btn) => btn.classList.remove("active"));
      e.classList.add("active");
      if (e == but1[0]) {
        price[0].textContent = price[0].getAttribute("data-mon") + " EGY";
      } else if (e == but1[1]) {
        price[0].textContent = price[0].getAttribute("data-3mon") + " EGY";
      } else if (e == but1[2]) {
        price[0].textContent = price[0].getAttribute("data-6mon") + " EGY";
      } else if (e == but2[0]) {
        price[2].textContent = price[2].getAttribute("data-mon") + " EGY";
      } else if (e == but2[1]) {
        price[2].textContent = price[2].getAttribute("data-3mon") + " EGY";
      } else if (e == but2[2]) {
        price[2].textContent = price[2].getAttribute("data-6mon") + " EGY";
      }
      // update WhatsApp links after changing duration
      if (typeof updateWhatsAppLinks === 'function') updateWhatsAppLinks();
    });
  });
}
prices_pr(but3, but3_2);

// Build and update WhatsApp links with selected plan + duration
function updateWhatsAppLinks() {
  const waBtns = document.querySelectorAll('.wa-btn');
  waBtns.forEach((a) => {
    const pkg = a.closest('.package');
    if (!pkg) return;
    const plan = (pkg.querySelector('.title h1') || {}).textContent || a.getAttribute('data-plan') || '';
    const durationEl = pkg.querySelector('.mon button.active');
    const duration = durationEl ? durationEl.textContent.trim() : '';
    const monPrEl = pkg.querySelector('.mon_pr button.active');
    const monPr = monPrEl ? monPrEl.textContent.trim() : '';

    let msg = `أرغب بالاشتراك في باقة ${plan} — ${duration}`;
    if (monPr) msg += ` — ${monPr}`;

    const encoded = encodeURIComponent(msg);
    // keep base number, attach text param
    a.href = `https://wa.me/+201201520308?text=${encoded}`;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });
}

// call once on load to set initial links
if (typeof updateWhatsAppLinks === 'function') updateWhatsAppLinks();
function prices_pr(a, b) {
  a.forEach((e) => {
    e.addEventListener("click", function () {
      a.forEach((btn) => btn.classList.remove("active"));
      e.classList.add("active");
      but3_2[1].classList.remove("active");
      but3_2[0].classList.add("active");
      if (e == but3[0]) {
        price[1].textContent = price[1].getAttribute("data-mon") + " EGY";
      } else if (e == but3[1]) {
        price[1].textContent = price[1].getAttribute("data-3mon") + " EGY";
      } else if (e == but3[2]) {
        price[1].textContent = price[1].getAttribute("data-6mon") + " EGY";
      }
      // update WhatsApp links after changing duration
      if (typeof updateWhatsAppLinks === 'function') updateWhatsAppLinks();
    });
    b.forEach((x) => {
      x.addEventListener("click", function () {
        b.forEach((btn) => btn.classList.remove("active"));
        x.classList.add("active");
        if (x.classList.contains("active") && e.classList.contains("active")) {
          if (e == but3[0] && x == but3_2[0]) {
            price[1].textContent = price[1].getAttribute("data-mon") + " EGY";
          } else if (e == but3[0] && x == but3_2[1]) {
            price[1].textContent = price[1].getAttribute("data-mon-2") + " EGY";
          } else if (e == but3[1] && x == but3_2[0]) {
            price[1].textContent = price[1].getAttribute("data-3mon") + " EGY";
          } else if (e == but3[1] && x == but3_2[1]) {
            price[1].textContent =
              price[1].getAttribute("data-3mon-2") + " EGY";
          } else if (e == but3[2] && x == but3_2[0]) {
            price[1].textContent = price[1].getAttribute("data-6mon") + " EGY";
          } else if (e == but3[2] && x == but3_2[1]) {
            price[1].textContent =
              price[1].getAttribute("data-6mon-2") + " EGY";
          }
          // update WhatsApp links when mon_pr selection changes
          if (typeof updateWhatsAppLinks === 'function') updateWhatsAppLinks();
        }
      });
    });
    b.forEach((x) => {});
  });
}
// Load images from images.json and populate galleries (reviews + transformations)
async function loadImagesFromJSON() {
  try {
    const response = await fetch("images.json");
    const imageData = await response.json();

    Object.keys(imageData).forEach((folder) => {
      // reviews_* → #reviews .review-gallery[data-gallery="..."]
      if (folder.startsWith("reviews_")) {
        const galleryName = folder.replace("reviews_", "");
        const gallery = document.querySelector(
          `#reviews .review-gallery[data-gallery="${galleryName}"]`,
        );
        if (!gallery) return;
        // clear existing content to avoid duplicates
        gallery.innerHTML = "";
        imageData[folder].forEach((imageName) => {
          const img = document.createElement("img");
          img.src = `imgs/${folder}/${imageName}`;
          img.alt = `${galleryName} review`;
          img.loading = "lazy";
          gallery.appendChild(img);
        });
        return;
      }

      // transformations → #transform .images
      if (folder === "transformations" || folder === "root") {
        const transformContainer = document.querySelector("#transform .images");
        if (!transformContainer) return;
        // keep placeholder <i> if present, then remove other imgs
        const placeholder = transformContainer.querySelector("i");
        transformContainer.innerHTML = "";
        if (placeholder) transformContainer.appendChild(placeholder);

        // sort numeric filenames (1.jpg, 2.jpg, ...) when possible
        const files = imageData[folder].slice();
        files.sort((a, b) => {
          const na = parseInt(a, 10);
          const nb = parseInt(b, 10);
          if (!isNaN(na) && !isNaN(nb)) return na - nb;
          return a.localeCompare(b);
        });

        files.forEach((imageName) => {
          const img = document.createElement("img");
          img.src = `imgs/${folder}/${imageName}`;
          img.alt = `تحول`;
          img.loading = "lazy";
          transformContainer.appendChild(img);
        });
        return;
      }

      // otherwise: ignore (utilits, other folders)
    });
  } catch (error) {
    console.error("Error loading images:", error);
  }
}

// Load images on page load
loadImagesFromJSON();

if (reviewTabs.length && reviewGalleries.length) {
  reviewTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      reviewTabs.forEach((btn) => btn.classList.remove("active"));
      reviewGalleries.forEach((gallery) => gallery.classList.remove("active"));

      tab.classList.add("active");
      let target = tab.getAttribute("data-target");
      let activeGallery = document.querySelector(
        `#reviews .review-gallery[data-gallery="${target}"]`,
      );

      if (activeGallery) {
        activeGallery.classList.add("active");
      }
    });
  });
}
function reveal() {
  let rights = document.querySelectorAll(".right");
  let hiddens = document.querySelectorAll(".hidden");
  let lefts = document.querySelectorAll(".left");
  for (i of [...hiddens, ...lefts, ...rights]) {
    var windowHeight = window.innerHeight;
    var elementTop = i.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      i.classList.add("active");
    } else if (elementTop > 0) {
      i.classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);
window.addEventListener("load", () => {
  loader.style.display = "none";
  pag.style.display = "block";
});