/**
* Template Name: Selecao
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString('en-IN', {
          minimumFractionDigits: Number.isInteger(target) ? 0 : 1,
          maximumFractionDigits: 1
        });
        return;
      }
      counter.textContent = Math.floor(current).toLocaleString('en-IN', {
        minimumFractionDigits: Number.isInteger(target) ? 0 : 1,
        maximumFractionDigits: 1
      });
      requestAnimationFrame(updateCounter);
    };
    updateCounter();
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        if (!counter.classList.contains('counted')) {
          counter.classList.add('counted');
          animateCounter(counter);
        }
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
});


function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi,mr',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

AOS.init({
  duration: 1000,
  once: true
});


var swiper = new Swiper('.recruiterSwiper', {
  slidesPerView: 2,
  spaceBetween: 10,
  breakpoints: {
    576: { slidesPerView: 3, spaceBetween: 15 },
    768: { slidesPerView: 4, spaceBetween: 20 },
    992: { slidesPerView: 6, spaceBetween: 20 }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});


// Initialize Bootstrap Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

document.getElementById('collegeFilter').addEventListener('change', function () {
  const selectedCollege = this.value;
  const cards = document.querySelectorAll('#calendarCards .calendar-card');
  cards.forEach(card => {
    const college = card.getAttribute('data-college');
    if (selectedCollege === 'all' || college === selectedCollege) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
});


// Bootstrap form validation
(function () {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Toggle Aadhar/Citizenship fields based on Nationality
document.getElementById('nationality').addEventListener('change', function () {
  const nationality = this.value;
  const aadharDiv = document.getElementById('aadharDiv');
  const citizenshipDiv = document.getElementById('citizenshipDiv');
  if (nationality === 'Indian') {
    aadharDiv.classList.remove('d-none');
    citizenshipDiv.classList.add('d-none');
    document.getElementById('saadhar').required = true;
    document.getElementById('citizenship').required = false;
  } else if (nationality === 'International') {
    aadharDiv.classList.add('d-none');
    citizenshipDiv.classList.remove('d-none');
    document.getElementById('saadhar').required = false;
    document.getElementById('citizenship').required = true;
  }
});

// Mock OTP generation
function gennew() {
  const mobile = document.getElementById('smobile').value;
  const mobileError = document.getElementById('mobileError');
  if (/^\d{10}$/.test(mobile)) {
    mobileError.classList.add('d-none');
    alert('OTP sent to ' + mobile + ': 1234 (Mock OTP for demo)');
    document.getElementById('checkotp').value = 'Y';
  } else {
    mobileError.textContent = 'Please enter a valid 10-digit mobile number.';
    mobileError.classList.remove('d-none');
  }
}

// Mock OTP verification
function verifyotp(element) {
  const otp = element.value;
  const otpError = document.getElementById('otpError');
  if (otp.length === 4 && otp === '1234') { // Mock OTP
    otpError.classList.add('d-none');
    document.getElementById('checkotp').value = 'Y';
  } else if (otp.length === 4) {
    otpError.textContent = 'Invalid OTP. Please try again.';
    otpError.classList.remove('d-none');
    document.getElementById('checkotp').value = 'N';
  }
}

// Aadhar validation
document.getElementById('saadhar').addEventListener('blur', function () {
  const aadhar = this.value;
  const aadharError = document.getElementById('aadharError');
  if (/^\d{12}$/.test(aadhar)) {
    aadharError.classList.add('d-none');
  } else {
    aadharError.textContent = 'Please enter a valid 12-digit Aadhar number.';
    aadharError.classList.remove('d-none');
  }
});

$(document).ready(function () {
  $('a[data-rel^=lightcase]').lightcase();
});