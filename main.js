(()=>{"use strict";var t=document.querySelector(".profile__avatar-box"),e=document.querySelector(".profile__avatar-image"),n=document.querySelector(".profile__edit-button"),o=document.querySelector(".profile__add-card-button"),r=document.querySelector(".elements"),c=document.querySelector(".profile__info"),a=document.querySelector(".profile__name"),i=document.querySelector(".profile__description"),u=document.querySelectorAll(".popup"),s=document.querySelector(".popup_type_edit-profile"),l=document.querySelector(".popup_type_add-card"),d=document.querySelector(".popup_type_edit-avatar"),f=document.querySelector(".popup_type_confirm-delete"),m=document.querySelector(".fullscreen-image"),p=m.querySelector(".fullscreen-image__picture"),v=m.querySelector(".fullscreen-image__label"),_=document.forms.profile,y=_.name,S=_.description,h=document.forms.card,b=h.label,q=h.link,k=document.forms.avatar,E=k["avatar-link"],g={formSelector:".form",fieldsetSelector:".form__fieldset",inputSelector:".form__input",submitButtonSelector:".form__action-button",inactiveButtonClass:"form__action-button_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_visible"};function L(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))}function C(t){"Escape"==t.key&&document.querySelectorAll(".popup_opened").forEach(A)}function j(t){document.addEventListener("keydown",C),t.classList.add("popup_opened")}function A(t){t.classList.remove("popup_opened"),document.removeEventListener("keydown",C)}var P,x="plus-cohort-22",T="2d446760-eb73-474d-999b-cb7f739e396a",B="https://mesto.nomoreparties.co";function I(t){a.textContent=t.name,i.textContent=t.about,e.src=t.avatar,c.dataset.id=t._id}function w(t,e,n){var o={method:e||"GET",headers:{authorization:T}};return n&&(o.body=JSON.stringify(n)),["PATCH","POST"].includes(e)&&(o.headers["Content-Type"]="application/json"),fetch("".concat(B,"/v1/").concat(x).concat(t),o)}function D(t,e){var n=t.querySelector(g.submitButtonSelector),o=n.textContent;return n.textContent=e,o}function H(t){t.preventDefault();var e=t.target.querySelector(g.submitButtonSelector);e.classList.add(g.inactiveButtonClass),e.setAttribute("disabled",!0),t.target.reset(),A(t.target.closest(".popup"))}function M(t){var e;e=f.dataset.cardId,w("/cards/".concat(e),"DELETE").then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(){r.childNodes.forEach((function(t){e===t.dataset.cardId&&t.remove()}))})).catch((function(t){console.log(t)})),A(t.target.closest(".popup")),f.dataset.cardId=""}function N(t){console.log(),f.dataset.cardId=t.target.closest(".card").dataset.cardId,j(f),f.querySelector(".form__action-button").addEventListener("click",M)}function O(t){var e=t.target.classList;(e.contains("popup__close-button")||e.contains("popup"))&&A(t.currentTarget)}function V(t,e){var n=t.querySelector(".card__like-button");!function(t){return t.some((function(t){return t._id===c.dataset.id}))}(e)?n.classList.remove("card__like-button_active"):n.classList.add("card__like-button_active"),n.dataset.likesCount=e.length}function z(t){var e=function(t){var e=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),n=e.querySelector(".card__item-photo"),o=e.querySelector(".card__item-label"),r=e.querySelector(".card__delete-button"),a=e.querySelector(".card__like-button");return e.dataset.cardId=t._id,c.dataset.id!==t.owner._id?r.remove():r.addEventListener("click",N),n.src=t.link,n.alt=t.name,o.textContent=t.name,V(e,t.likes),a.addEventListener("click",G),n.addEventListener("click",(function(){return e=t.link,n=t.name,j(m),p.src=e,p.alt=n,void(v.textContent=n);var e,n})),e}(t);r.prepend(e)}function G(t){var e,n=t.target.closest(".card");e=t.target.classList.contains("card__like-button_active")?"DELETE":"PUT",w("/cards/likes/".concat(n.dataset.cardId),e).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){V(n,t.likes)})).catch((function(t){console.log(t)}))}n.addEventListener("click",(function(){j(s),y.value=a.textContent,S.value=i.textContent})),o.addEventListener("click",(function(){j(l)})),t.addEventListener("click",(function(){j(d)})),u.forEach((function(t){t.addEventListener("click",O)})),h.addEventListener("submit",(function(t){var e,n,o,r=D(t.target,"Сохранение...");e=b.value,n=q.value,o={},e&&(o.name=e),n&&(o.link=n),w("/cards","POST",o).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){z(t)})).catch((function(t){console.log(t)})),H(t),D(t.target,r)})),_.addEventListener("submit",(function(t){var e,n,o,r=D(t.target,"Сохранение...");e=y.value,n=S.value,o={},e&&(o.name=e),n&&(o.about=n),w("/users/me","PATCH",o).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){I(t)})).catch((function(t){console.log(t)})),H(t),D(t.target,r)})),k.addEventListener("submit",(function(t){var e,n,o=D(t.target,"Сохранение...");n={},(e=E.value)&&(n.avatar=e),w("/users/me/avatar","PATCH",n).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){I(t)})).catch((function(t){console.log(t)})),H(t),D(t.target,o)})),w("/users/me").then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){I(t)})).catch((function(t){console.log(t)})),w("/cards").then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){t.forEach((function(t){z(t)}))})).catch((function(t){console.log(t)})),P=g,Array.from(document.querySelectorAll(P.formSelector)).forEach((function(t){Array.from(t.querySelectorAll(P.fieldsetSelector)).forEach((function(t){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);L(o,n,e),n.forEach((function(r){r.addEventListener("input",(function(){!function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorPatternMessage):e.setCustomValidity(""),e.validity.valid?function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(t,e,n):function(t,e,n,o){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n}(t,e,e.validationMessage,n)}(t,r,e),L(o,n,e)}))}))}(t,P)}))}))})();