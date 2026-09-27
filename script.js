const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const buttons = document.getElementById("buttons");

let escapes = 0;

const phrases = [
  "Tem certeza? 😭",
  "LU, pensa com carinho KKKKK",
  "Essa opção parece suspeita...",
  "Tá, eu mereci um pouquinho 😔",
  "Última chance de ser boazinha comigo 👀"
];

function moveNoButton() {
  escapes++;

  const maxX = Math.max(70, buttons.clientWidth / 2 - 70);
  const maxY = 45;

  const x = (Math.random() * 2 - 1) * maxX;
  const y = (Math.random() * 2 - 1) * maxY;

  noButton.style.transform = `translate(${x}px, ${y}px)`;

  hint.textContent = phrases[Math.min(escapes - 1, phrases.length - 1)];

  // Depois de algumas fugas, deixa a escolha ser real.
  if (escapes >= 6) {
    noButton.style.transform = "none";
    noButton.textContent = "NÃO 😔 (agora pode)";
    hint.textContent = "Tá bom... agora eu prometo não fugir. ❤️";
    noButton.onclick = () => {
      result.textContent = "Tudo bem. Eu respeito. Só queria que você soubesse que eu gosto muito de você. ❤️";
      noButton.disabled = true;
      yesButton.disabled = true;
      yesButton.style.opacity = ".45";
      noButton.style.opacity = ".65";
    };
  }
}

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", (event) => {
  if (escapes < 6) {
    event.preventDefault();
    moveNoButton();
  }
});

yesButton.addEventListener("click", () => {
  result.textContent = "EU SABIA 😭❤️ Agora vem cá dar um beijo no seu arrombado favorito.";
  hint.textContent = "";
  yesButton.disabled = true;
  noButton.disabled = true;
  noButton.style.opacity = ".35";
  yesButton.style.transform = "scale(1.08)";
});
