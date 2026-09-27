
emailjs.init({
  publicKey: "2yP5f7c0bdAyi9enU"
});

const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const buttons = document.getElementById("buttons");

let escapes = 0;
let sending = false;

const phrases = [
  "Tem certeza? 😭",
  "LUANAAAA pufavo",
  "Estoy a chorar",
  "OMDS, QUE KARAIA, AFA, NÃO FAZ ISSO CMG N",
  "LUANNANANANAN POR FAVORRRRRR"
];

async function sendResponse(resposta) {
  if (sending) return;
  sending = true;

  yesButton.disabled = true;
  noButton.disabled = true;
  hint.textContent = "Registrando sua resposta...";

  try {
    await emailjs.send(
      "service_jd7f6qi",
      "template_g4ps3dy",
      {
        resposta: resposta,
        data: new Date().toLocaleString("pt-BR"),
        to_email: "william02313102@gmail.com"
      }
    );

    hint.textContent = "Resposta registrada.";
  } catch (error) {
    console.error("Erro ao enviar:", error);
    hint.textContent =
      "Não foi possível enviar a resposta. Tente novamente.";
    yesButton.disabled = false;
    noButton.disabled = false;
    sending = false;
  }
}

function moveNoButton() {
  if (escapes >= 6 || sending) return;

  escapes++;

  const maxX = Math.max(70, buttons.clientWidth / 2 - 70);
  const maxY = 45;

  const x = (Math.random() * 2 - 1) * maxX;
  const y = (Math.random() * 2 - 1) * maxY;

  noButton.style.transform = `translate(${x}px, ${y}px)`;

  hint.textContent =
    phrases[Math.min(escapes - 1, phrases.length - 1)];

  if (escapes >= 6) {
    noButton.style.transform = "none";
    noButton.textContent = "NÃO 😔";
    hint.textContent = "Agora você pode escolher.";
  }
}

noButton.addEventListener("mouseenter", moveNoButton);

noButton.addEventListener("touchstart", (event) => {
  if (escapes < 6 && !sending) {
    event.preventDefault();
    moveNoButton();
  }
});

yesButton.addEventListener("click", async () => {
  if (sending) return;

  result.textContent =
    "isso ae fia";

  await sendResponse("SIM");
});

noButton.addEventListener("click", async () => {
  if (escapes < 6 || sending) return;

  result.textContent =
    "Ahhhh, tá bom, estoy tentando pelo menos afis afis sua lindoca";

  await sendResponse("NÃO");
});
