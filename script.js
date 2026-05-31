const confession = {
  date: "2026.05.31",
  recipient: "笑笑",
  paragraphs: [
    "有些话在心里放久了，会变得越来越认真。所以今天，我想把它好好说出来。",
    "我喜欢和你聊天时那种很自然的安心，也喜欢你出现以后，普通的一天会忽然变亮一点。",
    "如果可以的话，我想以恋人的身份站在你身边。不是只在浪漫的时候，而是在每个真实的日子里。"
  ]
};

const dateLine = document.querySelector("#dateLine");
const recipientName = document.querySelector("#recipientName");
const letterBody = document.querySelector("#letterBody");
const shareButton = document.querySelector("#shareButton");
const yesButton = document.querySelector("#yesButton");
const softButton = document.querySelector("#softButton");
const replyModal = document.querySelector("#replyModal");
const closeModal = document.querySelector("#closeModal");
const modalKicker = document.querySelector("#modalKicker");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const canvas = document.querySelector("#confettiCanvas");
const ctx = canvas.getContext("2d");

let hearts = [];
let animationFrame = null;

dateLine.textContent = confession.date;
recipientName.textContent = `${confession.recipient}：`;
letterBody.innerHTML = confession.paragraphs
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

function launchHearts(amount = 80) {
  const colors = ["#ec6f7f", "#ffd6da", "#f3c074", "#9fd6cf"];
  hearts = Array.from({ length: amount }, () => ({
    x: window.innerWidth / 2 + (Math.random() - 0.5) * 120,
    y: window.innerHeight * 0.58 + (Math.random() - 0.5) * 40,
    size: 8 + Math.random() * 16,
    speedX: (Math.random() - 0.5) * 7,
    speedY: -4 - Math.random() * 7,
    gravity: 0.09 + Math.random() * 0.05,
    rotation: Math.random() * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 0.16,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 90 + Math.random() * 60
  }));

  if (!animationFrame) {
    animateHearts();
  }
}

function drawHeart(x, y, size, rotation, color, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(size / 24, size / 24);
  ctx.globalAlpha = Math.max(alpha, 0);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.bezierCurveTo(-18, -6, -10, -18, 0, -8);
  ctx.bezierCurveTo(10, -18, 18, -6, 0, 8);
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  hearts.forEach((heart) => {
    heart.x += heart.speedX;
    heart.y += heart.speedY;
    heart.speedY += heart.gravity;
    heart.rotation += heart.rotationSpeed;
    heart.life -= 1;
    drawHeart(
      heart.x,
      heart.y,
      heart.size,
      heart.rotation,
      heart.color,
      heart.life / 120
    );
  });

  hearts = hearts.filter((heart) => heart.life > 0);

  if (hearts.length) {
    animationFrame = requestAnimationFrame(animateHearts);
  } else {
    animationFrame = null;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

function openReply(kind) {
  if (kind === "yes") {
    modalKicker.textContent = "我听见啦";
    modalTitle.textContent = "那从今天开始，我们一起往前走。";
    modalText.textContent =
      "这句话我会记很久，也会用以后的每一天好好证明。";
    launchHearts(96);
  } else {
    modalKicker.textContent = "没关系";
    modalTitle.textContent = "我会认真等你想清楚。";
    modalText.textContent =
      "喜欢不是催促，是把真心放在你能安心看见的地方。";
    launchHearts(42);
  }

  if (typeof replyModal.showModal === "function") {
    replyModal.showModal();
  }
}

async function sharePage() {
  const shareData = {
    title: document.title,
    text: "笑笑，有一封信想认真给你看。",
    url: window.location.href
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return;
  }

  await navigator.clipboard.writeText(window.location.href);
  shareButton.textContent = "链接已复制";
  window.setTimeout(() => {
    shareButton.textContent = "分享给 TA";
  }, 1800);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
yesButton.addEventListener("click", () => openReply("yes"));
softButton.addEventListener("click", () => openReply("soft"));
closeModal.addEventListener("click", () => replyModal.close());
shareButton.addEventListener("click", () => {
  sharePage().catch(() => {
    shareButton.textContent = "复制失败";
    window.setTimeout(() => {
      shareButton.textContent = "分享给 TA";
    }, 1800);
  });
});
