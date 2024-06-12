document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    { name: "b", img: "./assets/images/b.png" },
    { name: "b", img: "./assets/images/b.png" },
    { name: "blk", img: "./assets/images/blk.png" },
    { name: "blk", img: "./assets/images/blk.png" },
    { name: "g", img: "./assets/images/g.png" },
    { name: "g", img: "./assets/images/g.png" },
    { name: "o", img: "./assets/images/o.png" },
    { name: "o", img: "./assets/images/o.png" },
    { name: "p", img: "./assets/images/p.png" },
    { name: "p", img: "./assets/images/p.png" },
    { name: "r", img: "./assets/images/r.png" },
    { name: "r", img: "./assets/images/r.png" },
    { name: "y", img: "./assets/images/y.png" },
    { name: "y", img: "./assets/images/y.png" },
    { name: "m", img: "./assets/images/multi-colors.png" },
    { name: "m", img: "./assets/images/multi-colors.png" },
  ];
  const audio = document.querySelector(".audio");
  cardArray.sort(() => 0.5 - Math.random());

  const gameBoard = document.querySelector("#game-board");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsMatched = [];

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.setAttribute("data-id", i);
      card.innerHTML = `
              <div class="front"></div>
              <div class="back"><img src="${cardArray[i].img}" /></div>
          `;
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    }
  }

  function flipCard() {
    let cardId = this.getAttribute("data-id");
    if (cardsChosenId.includes(cardId) || this.classList.contains("flipped")) {
      return; // Prevent clicking the same card twice
    }
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.classList.add("flipped");

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 300);
    }

    audio.src = "./assets/audio/flipcard.mp3";
  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
      audio.src = "./assets/audio/true.mp3";
      cards[optionOneId].classList.add("matched");
      cards[optionTwoId].classList.add("matched");

      // Remove click event listeners for matched cards
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
    } else {
      audio.src = "./assets/audio/false.mp3";
      cards[optionOneId].classList.remove("flipped");
      cards[optionTwoId].classList.remove("flipped");
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (document.querySelectorAll(".matched").length === cardArray.length) {
      setTimeout(() => {
        alert("Congratulations! You found them all!");
      }, 100);
    }
  }

  createBoard();
});
