let bar = document.querySelector(".bar");
let close = document.querySelector(".close");
let navs = document.querySelectorAll("header ul li");
let nav = document.querySelector("header ul");

console.log(navs);
navs.forEach((e) => {
  e.addEventListener("click", () => {
    navs.forEach((e) => e.classList.remove("active"));
    e.classList.add("active");
  });
});
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
