
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); 
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section, .card, h2").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});


const topBtn = document.createElement("button");
topBtn.textContent = "↑ Topo";
topBtn.id = "backToTop";
document.body.appendChild(topBtn);

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});


const title = document.querySelector(".hero h1");
if (title) {
  const text = title.textContent;
  title.textContent = "";
  let i = 0;
  const typeEffect = setInterval(() => {
    title.textContent += text[i];
    i++;
    if (i === text.length) clearInterval(typeEffect);
  }, 80);
}


document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mouseenter", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = e.offsetX + "px";
    ripple.style.top = e.offsetY + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});


const toggleBtn = document.createElement("button");
toggleBtn.textContent = "🌙";
toggleBtn.id = "themeToggle";
document.body.appendChild(toggleBtn);

const root = document.documentElement;
if (localStorage.getItem("theme") === "light") {
  root.classList.add("light");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  root.classList.toggle("light");
  if (root.classList.contains("light")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});
