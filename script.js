document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
  const postMedia = document.querySelector(".post-media");
  const bookmarkBtn = document.querySelector(".post-actions > .action-btn");

  if (!likeBtn) return;

  const likeSvg = likeBtn.querySelector("svg");

  // Localiza e isola o nó de texto do número de curtidas
  let textNode = Array.from(likeBtn.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
  );

  let likesCountSpan = document.createElement("span");
  likesCountSpan.classList.add("like-count");

  if (textNode) {
    textNode.replaceWith(likesCountSpan);
  } else {
    likeBtn.appendChild(likesCountSpan);
  }

  // Estado inicial
  let baseLikes = 0;
  let isLiked = false;
  likesCountSpan.textContent = formatLikes(baseLikes);

  // Formatação de números
  function formatLikes(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  // Animação de pulso no ícone de coração
  function animateHeart() {
    if (likeSvg) {
      likeSvg.style.transform = "scale(1.3)";
      setTimeout(() => {
        likeSvg.style.transform = "scale(1)";
      }, 150);
    }
  }

  // Incrementa a curtida
  function addLike() {
    baseLikes++;
    isLiked = true;
    likeBtn.classList.add("liked");
    likesCountSpan.textContent = formatLikes(baseLikes);
    animateHeart();
  }

  // Remove a curtida
  function removeLike() {
    isLiked = false;
    baseLikes = Math.max(0, baseLikes - 1);
    likeBtn.classList.remove("liked");
    likesCountSpan.textContent = formatLikes(baseLikes);
    animateHeart();
  }

  // Evento no botão de Coração (Alterna entre somar e diminuir)
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isLiked) {
      removeLike();
    } else {
      addLike();
    }
  });

  // Evento de clique na imagem principal (Sempre soma)
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      addLike();
    });
  }

  // Evento de clique no botão de Salvar (Bookmark)
  if (bookmarkBtn) {
    let isBookmarked = false;
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isBookmarked = !isBookmarked;
      bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

      const svg = bookmarkBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = "scale(1.2)";
        setTimeout(() => {
          svg.style.transform = "scale(1)";
        }, 150);
      }
    });
  }
});