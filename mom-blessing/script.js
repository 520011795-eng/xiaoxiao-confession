const blessing = {
  date: "2026.05.31",
  paragraphs: [
    "小李妈妈，很多感谢平时说不出口，但每一次想起您的辛苦和牵挂，心里都觉得很暖。",
    "愿您每天都睡得安稳、吃得开心，遇到的事情都顺顺利利，心情像窗边的阳光一样明亮。",
    "我们会慢慢长大，也会更认真地陪伴您。愿您把更多时间留给自己，去做喜欢的事，过舒心的日子。"
  ]
};

const letterBody = document.querySelector("#letterBody");
const shareButton = document.querySelector("#shareButton");
const wishButton = document.querySelector("#wishButton");
const wishModal = document.querySelector("#wishModal");
const closeModal = document.querySelector("#closeModal");
const canvas = document.querySelector("#petalCanvas");
const ctx = canvas.getContext("2d");

let petals = [];
let frame = null;

letterBody.innerHTML = blessing.paragraphs
  .map((paragraph, index) => {
    const delay = 120 + index * 160;
    return `<p style="animation-delay: ${delay}ms">${paragraph}</p>`;
  })
  .join("");

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function launchPetals(amount = 72) {
  const colors = ["#dc755d", "#f2b08a", "#f6d6b8", "#8daf7f"];
  petals = Array.from({ length: amount }, () => ({
    x: window.innerWidth / 2 + (Math.random() - 0.5) * 160,
    y: window.innerHeight * 0.54 + (Math.random() - 0.5) * 40,
    width: 8 + Math.random() * 14,
    height: 14 + Math.random() * 18,
    speedX: (Math.random() - 0.5) * 5.5,
    speedY: -3.5 - Math.random() * 6,
    gravity: 0.07 + Math.random() * 0.05,
    rotation: Math.random() * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 0.18,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 90 + Math.random() * 70
  }));

  if (!frame) {
    animatePetals();
  }
}

function drawPetal(petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.globalAlpha = Math.max(petal.life / 130, 0);
  ctx.fillStyle = petal.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, petal.width / 2, petal.height / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  petals.forEach((petal) => {
    petal.x += petal.speedX + Math.sin(petal.life / 8) * 0.6;
    petal.y += petal.speedY;
    petal.speedY += petal.gravity;
    petal.rotation += petal.rotationSpeed;
    petal.life -= 1;
    drawPetal(petal);
  });

  petals = petals.filter((petal) => petal.life > 0);

  if (petals.length) {
    frame = requestAnimationFrame(animatePetals);
  } else {
    frame = null;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

async function sharePage() {
  const shareData = {
    title: document.title,
    text: "小李妈妈，愿您健康、平安、幸福。",
    url: window.location.href
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return;
  }

  await navigator.clipboard.writeText(window.location.href);
  shareButton.textContent = "链接已复制";
  window.setTimeout(() => {
  shareButton.textContent = "分享给小李妈妈";
  }, 1800);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
wishButton.addEventListener("click", () => {
  launchPetals(88);
  if (typeof wishModal.showModal === "function") {
    wishModal.showModal();
  }
});
closeModal.addEventListener("click", () => wishModal.close());
shareButton.addEventListener("click", () => {
  sharePage().catch(() => {
    shareButton.textContent = "复制失败";
    window.setTimeout(() => {
      shareButton.textContent = "分享给小李妈妈";
    }, 1800);
  });
});
