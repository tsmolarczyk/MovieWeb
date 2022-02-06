// MODAL

function openModal() {
  state.modalOpened = true;
  renderModal();
}

function closeModal() {
  state.modalOpened = false;
  renderModal();
}

function renderModal() {
  modalDescription.innerHTML = "";

  if (state.modalOpened === false) {
    modalDescription.classList.remove("active");
    movieList.classList.remove("shadow");
    return;
  }

  const modalTitle = document.createElement("h3");
  const modalText = document.createElement("p");
  const modalCloseBtn = document.createElement("button");
  const shadow = document.querySelector(".shadow");

  modalTitle.textContent = state.movieDetails.title;
  modalText.textContent = state.movieDetails.overview;

  modalCloseBtn.classList.add("close-btn");
  modalTitle.classList.add("modal-title");
  modalText.classList.add("modal-text");

  modalDescription.classList.add("active");
  movieList.classList.add("shadow");

  modalDescription.appendChild(modalTitle);
  modalDescription.appendChild(modalText);
  modalDescription.appendChild(modalCloseBtn);

  modalCloseBtn.addEventListener("click", () => closeModal());
}
