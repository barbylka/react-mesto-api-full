const dataValidator = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
}

const avaForm = document.querySelector('.popup__container_type_avatar');
const editForm = document.querySelector('.popup__container_type_edit');
const addForm = document.querySelector('.popup__container_type_add');
const ESC_CODE = 'Escape';

export { avaForm, dataValidator, editForm, addForm, ESC_CODE }