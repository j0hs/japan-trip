document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  // 햄버거 메뉴 토글
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
  // 메인 비주얼 Swiper + 커스텀 프로그레스 바
  const mainSwiper = new Swiper('.main_visual', {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    on: {
      init: function () {
        const firstBullet = document.querySelector('.swiper-pagination-bullet');
        if (firstBullet) {
          requestAnimationFrame(() => {
            firstBullet.classList.add('progressing');
          });
        }
      },
      slideChangeTransitionStart: function () {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach(b => b.classList.remove('progressing'));
        requestAnimationFrame(() => {
          bullets[this.realIndex].classList.add('progressing');
        });
      }
    }
  });
  // 카드 슬라이더 (가운데 정렬 & 자동)
  const cardSwiper = new Swiper('.card-slider', {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 10, // 간격 줄임
    centeredSlides: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        centeredSlides: true
      },
      480: {
        slidesPerView: 2,
        centeredSlides: true
      },
      768: {
        slidesPerView: 3,
        centeredSlides: false
      },
      1024: {
        slidesPerView: 4,
        centeredSlides: false
      }
    }
  });
  // 스크롤 내려가면 헤더 스타일 변경
  header.classList.add('main-visual-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight - 50) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });
});
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
// 디데이 목표 날짜
const targetDate = new Date("2025-08-14T00:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  daysEl.innerText = days >= 0 ? days : 0;
  hoursEl.innerText = hours >= 0 ? hours : 0;
  minutesEl.innerText = minutes >= 0 ? minutes : 0;
  secondsEl.innerText = seconds >= 0 ? seconds : 0;
}
// 1초마다 갱신
setInterval(updateCountdown, 1000);
updateCountdown();
