(()=>{"use strict";var t=document.querySelector(".profile__avatar-box"),e=document.querySelector(".profile__edit-button"),r=document.querySelector(".profile__add-card-button"),n=document.forms.profile,o=document.forms.avatar,i=document.forms.card,a={formSelector:".form",fieldsetSelector:".form__fieldset",inputSelector:".form__input",submitButtonSelector:".form__action-button",inactiveButtonClass:"form__action-button_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_visible"};function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===u(o)?o:String(o)),n)}var o}var c=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.options=e}var e,r;return e=t,(r=[{key:"_request",value:function(t,e){return fetch("".concat(this.options.baseUrl).concat(t),e).then(this._checkResponse)}},{key:"_checkResponse",value:function(t){if(t.ok)return t.json();console.log("HTTP ошибка! статус: ".concat(t.status))}},{key:"loadProfile",value:function(){return this._request("/users/me",{headers:this.options.headers})}},{key:"updateProfile",value:function(t,e){return this._request("/users/me",{method:"PATCH",headers:this.options.headers,body:JSON.stringify({name:t,about:e})})}},{key:"updateAvatar",value:function(t){return this._request("/users/me/avatar",{method:"PATCH",headers:this.options.headers,body:JSON.stringify({avatar:t})})}},{key:"deleteCard",value:function(t){return this._request("/cards/".concat(t),{method:"DELETE",headers:this.options.headers})}},{key:"loadCards",value:function(){return this._request("/cards",{headers:this.options.headers})}},{key:"saveCard",value:function(t,e){return this._request("/cards",{method:"POST",headers:this.options.headers,body:JSON.stringify({name:t,link:e})})}},{key:"toggleLike",value:function(t,e){var r=e?"DELETE":"PUT";return this._request("/cards/likes/".concat(t),{method:r,headers:this.options.headers})}}])&&l(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function f(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===s(o)?o:String(o)),n)}var o}var p=function(){function t(e,r){var n=e._id,o=e.name,i=e.link,a=e.likes,u=e.owner,l=r.handleLikeClick,c=r.handleDeleteClick,s=r.handleCardClick,f=r.saveCard,p=r.selector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selector=p,this._id=n,this._name=o,this._link=i,this._owner=u,this._setLikes(a),this._handleLikeClick=l.bind(this),this._handleDeleteClick=c.bind(this),this._handleCardClick=s.bind(this),this._saveCard=f.bind(this)}var e,r;return e=t,(r=[{key:"element",get:function(){return this._element}},{key:"cardId",get:function(){return this._id}},{key:"name",get:function(){return this._name}},{key:"link",get:function(){return this._link}},{key:"_setEmptyElement",value:function(){this._element=document.querySelector(this._selector).content.querySelector(".card").cloneNode(!0)}},{key:"_setEventListeners",value:function(t){this._owner._id===t?this._deleteButton.addEventListener("click",this._handleDeleteClick):this._deleteButton.remove(),this._likeButton.addEventListener("click",this._handleLikeClick),this._cardItemPhoto.addEventListener("click",this._handleCardClick)}},{key:"enrichCard",value:function(t){var e=t._id,r=t.name,n=t.link,o=t.likes,i=t.owner;this._id=e,this._name=r,this._link=n,this._setLikes(o),this._owner=i}},{key:"saveCard",value:function(){return this._saveCard(this._name,this._link)}},{key:"createCard",value:function(t){return this._setEmptyElement(),this._cardItemPhoto=this._element.querySelector(".card__item-photo"),this._cardItemLabel=this._element.querySelector(".card__item-label"),this._deleteButton=this._element.querySelector(".card__delete-button"),this._likeButton=this._element.querySelector(".card__like-button"),this._element.dataset.cardId=this._id,this._cardItemPhoto.src=this._link,this._cardItemPhoto.alt=this._name,this._cardItemLabel.textContent=this._name,this.toggleLikeButton(this._likes,t),this._setEventListeners(t),this._element}},{key:"hasUserLike",value:function(t){return this._likes.some((function(e){return e._id===t}))}},{key:"toggleLikeButton",value:function(t,e){this._setLikes(t),this.hasUserLike(e)?this._likeButton.classList.add("card__like-button_active"):this._likeButton.classList.remove("card__like-button_active"),this._likeButton.dataset.likesCount=this._likes.length}},{key:"_setLikes",value:function(t){this._likes=t}}])&&f(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function d(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==y(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==y(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===y(o)?o:String(o)),n)}var o}var h=function(){function t(e,r){var n=e.handleLikeClick,o=e.handleDeleteClick,i=e.handleCardClick,a=e.deleteCard,u=e.saveCard;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.handleLikeClick=n,this.handleDeleteClick=o,this.handleCardClick=i,this.saveCard=u,this._deleteCard=a,this.selector=r}var e,r;return e=t,(r=[{key:"deleteCard",value:function(t){return this._deleteCard(t)}}])&&d(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function m(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==v(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==v(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===v(o)?o:String(o)),n)}var o}var b=function(){function t(e,r){var n=e.nameSelector,o=e.descriptionSelector,i=e.avatarSelector,a=r.loadProfile,u=r.updateProfile,l=r.updateAvatar;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameElement=document.querySelector(n),this._descriptionElement=document.querySelector(o),this._avatarElement=document.querySelector(i),this._loadProfile=a,this._updateProfile=u,this._updateAvatar=l}var e,r;return e=t,(r=[{key:"userId",get:function(){return this._id}},{key:"name",get:function(){return this._name}},{key:"about",get:function(){return this._about}},{key:"avatar",get:function(){return this._avatar}},{key:"_refreshProfile",value:function(t){var e=t._id,r=t.name,n=t.about,o=t.avatar;this._id=e||this._id,this._name=r||this.name,this._about=n||this.about,this._avatar=o||this.avatar}},{key:"renderProfile",value:function(){this._nameElement.textContent=this._name,this._descriptionElement.textContent=this._about,this._avatarElement.src=this._avatar}},{key:"setupProfile",value:function(t){this._refreshProfile(t)}},{key:"setUserInfo",value:function(t){var e=this,r=t.name,n=t.about,o=t.avatar;if(r&&n)return this._updateProfile(r,n).then((function(t){e._refreshProfile(t),e.renderProfile()})).catch((function(t){return console.log(t)}));if(o)return this._updateAvatar(o).then((function(t){e._refreshProfile(t),e.renderProfile()})).catch((function(t){return console.log(t)}));throw new Error("Unsupported function call")}},{key:"getUserInfo",value:function(){var t=this;return this._loadProfile().then((function(e){return t._refreshProfile(e)}))}}])&&m(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==_(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==_(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===_(o)?o:String(o)),n)}var o}var g=function(){function t(e){var r=e.renderer,n=e.selector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._container=document.querySelector(n),this._renderer=r,this._data=[]}var e,r;return e=t,(r=[{key:"addItemToStart",value:function(t){this._container.prepend(t)}},{key:"addItemToEnd",value:function(t){this._container.append(t)}},{key:"remove",value:function(t){this._container.childNodes.forEach((function(e){t===e.dataset.cardId&&e.remove()}))}},{key:"_clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(t){var e=this;this._clear(),this._data=t,this._data.forEach((function(t){e._renderer(t)}))}}])&&k(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function S(t){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function w(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==S(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==S(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===S(o)?o:String(o)),n)}var o}var C=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,r;return e=t,(r=[{key:"open",value:function(){document.addEventListener("keydown",this._handleEscClose),this._popup.classList.add("popup_opened")}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"==t.key&&this.close()}},{key:"_handleClickClose",value:function(t){var e=t.target.classList;(e.contains("popup__close-button")||e.contains("popup"))&&this.close()}},{key:"setEventListeners",value:function(){this._popup.addEventListener("click",this._handleClickClose.bind(this))}}])&&w(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function E(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==P(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==P(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===P(o)?o:String(o)),n)}var o}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=L(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},j.apply(this,arguments)}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function L(t){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},L(t)}var I=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=L(n);if(o){var r=L(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===P(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._image=e._popup.querySelector(".fullscreen-image__picture"),e._label=e._popup.querySelector(".fullscreen-image__label"),e}return e=a,(r=[{key:"open",value:function(t,e){this._image.src=t,this._image.alt=e,this._label.textContent=e,j(L(a.prototype),"open",this).call(this)}}])&&E(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(C);function T(t){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T(t)}function q(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function B(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==T(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==T(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===T(o)?o:String(o)),n)}var o}function R(){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=x(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},R.apply(this,arguments)}function A(t,e){return A=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},A(t,e)}function x(t){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},x(t)}var D=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&A(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=x(n);if(o){var r=x(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===T(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t,e,r){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._handleFormSubmit=e,n._form=n._popup.querySelector(".form"),n._button=n._form.querySelector(".form__action-button"),n._validator=r,n._inputs=Array.from(n._form.querySelectorAll(".form__input")),n._buttonText=n._button.textContent,n}return e=a,(r=[{key:"_getInputValues",value:function(){return this._inputs.reduce((function(t,e){return t[e.name]=e.value,t}),{})}},{key:"setEventListeners",value:function(){var t=this;R(x(a.prototype),"setEventListeners",this).call(this),this._validator.enableValidation(),this._form.addEventListener("submit",function(e){e.preventDefault(),t._button.textContent="Сохранение...",t._handleFormSubmit(t._getInputValues()).then((function(){return t.close()})).catch((function(t){console.log(t)})).finally((function(){t._button.textContent=t._buttonText}))}.bind(this))}},{key:"open",value:function(t){if(this._form.reset(),this._validator.hideFormErrors(),t)for(var e=0,r=Object.entries(t);e<r.length;e++){var n=(u=r[e],l=2,function(t){if(Array.isArray(t))return t}(u)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,u=[],l=!0,c=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;l=!1}else for(;!(l=(n=i.call(r)).done)&&(u.push(n.value),u.length!==e);l=!0);}catch(t){c=!0,o=t}finally{try{if(!l&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw o}}return u}}(u,l)||function(t,e){if(t){if("string"==typeof t)return q(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?q(t,e):void 0}}(u,l)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],i=n[1];this._form[o].value=i}var u,l;this._validator.toggleButtonState(),R(x(a.prototype),"open",this).call(this)}},{key:"close",value:function(){R(x(a.prototype),"close",this).call(this),this._form.reset()}}])&&B(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(C);function U(t){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},U(t)}function V(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==U(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==U(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===U(o)?o:String(o)),n)}var o}function M(){return M="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=F(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},M.apply(this,arguments)}function N(t,e){return N=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},N(t,e)}function F(t){return F=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},F(t)}var H=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&N(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=F(n);if(o){var r=F(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===U(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t,e){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,t))._handleConfirm=e,r._button=r._popup.querySelector(".form__action-button"),r}return e=a,(r=[{key:"open",value:function(t){this._data=t,M(F(a.prototype),"open",this).call(this)}},{key:"setEventListeners",value:function(){var t=this;M(F(a.prototype),"setEventListeners",this).call(this),this._button.addEventListener("click",function(e){e.preventDefault(),t._handleConfirm(t._data).then((function(){return t.close()})).catch((function(t){console.log(t)}))}.bind(this))}}])&&V(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(C);function J(t){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(t)}function z(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==J(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==J(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===J(o)?o:String(o)),n)}var o}var $=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._validationConfig=e,this._formElement=r,this._inputList=Array.from(r.querySelectorAll(e.inputSelector)),this._submitButton=r.querySelector(e.submitButtonSelector)}var e,r;return e=t,(r=[{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._submitButton.classList.add(this._validationConfig.inactiveButtonClass),this._submitButton.setAttribute("disabled",!0)):(this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass),this._submitButton.removeAttribute("disabled"))}},{key:"toggleButtonState",value:function(){this._toggleButtonState()}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_checkInputValidity",value:function(t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorPatternMessage):t.setCustomValidity(""),t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_showInputError",value:function(t,e){var r=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.add(this._validationConfig.inputErrorClass),r.classList.add(this._validationConfig.errorClass),r.textContent=e}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._validationConfig.inputErrorClass),e.classList.remove(this._validationConfig.errorClass),e.textContent=""}},{key:"hideFormErrors",value:function(){var t=this;this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"_setEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&z(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}(),G=new c({baseUrl:"https://nomoreparties.co/v1/plus-cohort-22",headers:{authorization:"2d446760-eb73-474d-999b-cb7f739e396a","Content-Type":"application/json"},emailAddress:"plus-cohort-22@ya.ru"}),K=new b({nameSelector:".profile__name",descriptionSelector:".profile__description",avatarSelector:".profile__avatar-image"},{loadProfile:function(){return G.loadProfile()},updateProfile:function(t,e){return G.updateProfile(t,e)},updateAvatar:function(t){return G.updateAvatar(t)}}),Q=new D(".popup_type_add-card",(function(t){var e=t.label,r=t.link;return new p({name:e,link:r},tt).saveCard()}),new $(a,i)),W=new D(".popup_type_edit-avatar",(function(t){return K.setUserInfo({avatar:t["avatar-link"]})}),new $(a,o)),X=new D(".popup_type_edit-profile",(function(t){var e=t.name,r=t.description;return K.setUserInfo({name:e,about:r})}),new $(a,n)),Y=new I(".fullscreen-image"),Z=new H(".popup_type_confirm-delete",(function(t){return tt.deleteCard(t)})),tt=new h({handleLikeClick:function(){var t=this;G.toggleLike(this.cardId,this.hasUserLike(K.userId)).then((function(e){t.toggleLikeButton(e.likes,K.userId)})).catch((function(t){console.log(t)}))},handleDeleteClick:function(){Z.open(this.cardId)},handleCardClick:function(){Y.open(this._link,this._name)},deleteCard:function(t){return G.deleteCard(t).then((function(){et.remove(t)})).catch((function(t){console.log(t)}))},saveCard:function(t,e){var r=this;return G.saveCard(t,e).then((function(t){r.enrichCard(t);var e=r.createCard(K.userId);et.addItemToStart(e)}))}},"#card-template"),et=new g({renderer:function(t){var e=new p({},tt);e.enrichCard(t);var r=e.createCard(K.userId);et.addItemToEnd(r)},selector:".elements"});Promise.all([K.getUserInfo(),G.loadCards()]).then((function(t){K.renderProfile(),et.renderItems(t[1])})).catch((function(t){console.log(t)})),e.addEventListener("click",(function(){return X.open({name:K.name,description:K.about})})),r.addEventListener("click",(function(){return Q.open()})),t.addEventListener("click",(function(){return W.open()})),Q.setEventListeners(),W.setEventListeners(),X.setEventListeners(),Y.setEventListeners(),Z.setEventListeners()})();