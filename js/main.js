document.addEventListener("DOMContentLoaded", () => {
  const scrollLinks = document.querySelectorAll(".js-scroll");
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) {
        return;
      }
      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const form = document.querySelector("#signup-form");
  const message = document.querySelector("#signup-message");
  const emailInput = document.querySelector("#signup-email");
  const nameInput = document.querySelector("#signup-name");
  const storageKey = "homiesBetaSignup";

  if (!form || !message || !emailInput) {
    return;
  }

  const showMessage = (text, type) => {
    message.textContent = text;
    message.classList.remove("is-success", "is-error");
    if (type) {
      message.classList.add(type);
    }
  };

  const setSuccessState = () => {
    showMessage("¡Listo! Te avisaremos cuando la beta esté disponible.", "is-success");
  };

  const stored = localStorage.getItem(storageKey);
  if (stored) {
    setSuccessState();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const name = nameInput ? nameInput.value.trim() : "";
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      showMessage("Por favor ingresa un correo válido.", "is-error");
      emailInput.focus();
      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        name,
        email,
        submittedAt: new Date().toISOString(),
      })
    );
    setSuccessState();
    form.reset();
  });
});
