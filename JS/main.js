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
if (bar || close) {
  bar.addEventListener("click", () => {
    close.style.display = "block";
    nav.style.width = "40%";
  });
  close.addEventListener("click", () => {
    close.style.display = "none";
    nav.style.width = "0%";
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
    });
  });
}
prices_pr(but3, but3_2);
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
        }
      });
    });
    b.forEach((x) => {});
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
