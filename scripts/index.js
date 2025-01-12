const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileBtn = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const cardAddBtn = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");

const cardTemplate = document.querySelector("#card-template").content;
const placesItem = document.querySelector(".places__list");

const cardFormElemnt = document.querySelector(".popup__form");
const cardName = document.querySelector(".popup__input_type_card-name");
const cardUrl = document.querySelector(".popup__input_type_url");

const profileFormElement = document.querySelector(".popup__form");

function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    const popupImageElement = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });
  placesItem.append(cardElement);
  return cardElement;
}

function openModal(popup) {
  popup.style.visibility = "visible";
  popup.style.transition = "none";
  setTimeout(() => {
    popup.style.transition = "";
    popup.classList.add("popup_is-animated");
    popup.classList.add("popup_is-opened");
  }, 0);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.style.visibility = "hidden";
  }, 600);
}

profileBtn.addEventListener("click", profileEdit);

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closeModal(popup);
  });
});
function profileEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

cardAddBtn.addEventListener("click", () => openModal(cardPopup));

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  createCard(cardNameInput.value, cardUrlInput.value);
  evt.target.reset();
  closeModal(cardPopup);
}
cardFormElemnt.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((element) => {
  const card = createCard(element.name, element.link);
  placesItem.append(card);
});
