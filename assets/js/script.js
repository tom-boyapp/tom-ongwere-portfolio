'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Robust navigation handler using explicit data-target attributes
navigationLinks.forEach(link => {
  link.addEventListener('click', function () {
    // prefer explicit mapping via `data-target`; fallback to button text if absent
    const target = (this.dataset.target || this.innerText || '').toLowerCase().trim();
    if (!target) return;

    // activate the matching page and deactivate others
    pages.forEach(page => {
      if ((page.dataset.page || '').toLowerCase() === target) page.classList.add('active');
      else page.classList.remove('active');
    });

    // update link active state
    navigationLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    window.scrollTo(0, 0);
  });
});

// Measure navbar height and set CSS variable so layout/scroll spacing matches the actual navbar size
function updateNavbarSafe() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  // include a small buffer so we don't sit flush against the navbar
  const buffer = 16;
  const height = navbar.offsetHeight || 0;
  // determine if navbar is visually at the top or bottom by checking computed style
  const cs = window.getComputedStyle(navbar);
  const rect = navbar.getBoundingClientRect();
  // Consider the navbar to be "at top" only if it actually sits near the viewport top.
  // This avoids treating an absolutely-positioned navbar inside a centered container
  // (which may have top:0 relative to its container) as a top-of-viewport navbar.
  const isNearViewportTop = rect.top <= 8; // small threshold in px
  const isTop = isNearViewportTop && (cs.position === 'absolute' || cs.position === 'fixed' || cs.position === 'sticky');
  const isFixedBottom = cs.position === 'fixed' && cs.bottom !== 'auto';
  if (isTop) {
    document.documentElement.classList.add('navbar-at-top');
    document.documentElement.classList.remove('navbar-at-bottom');
    // set the top-safe spacing so CSS can push content down
    document.documentElement.style.setProperty('--navbar-safe-top', `${height + buffer}px`);
    document.documentElement.style.setProperty('--navbar-safe-bottom', `0px`);
    // No inline positioning here — let CSS place the navbar relative to the layout.
  } else {
    // default to bottom behavior
    document.documentElement.classList.remove('navbar-at-top');
    document.documentElement.classList.add('navbar-at-bottom');
    document.documentElement.style.setProperty('--navbar-safe-bottom', `${height + buffer}px`);
    document.documentElement.style.setProperty('--navbar-safe-top', `0px`);
    // clear any inline positioning so CSS can handle bottom-fixed layout
    navbar.style.removeProperty('top');
    navbar.style.removeProperty('left');
    navbar.style.removeProperty('position');
  }
}

// update on load and whenever viewport changes
window.addEventListener('load', updateNavbarSafe);
window.addEventListener('resize', updateNavbarSafe);
window.addEventListener('orientationchange', updateNavbarSafe);
// call once in case script runs after load
updateNavbarSafe();