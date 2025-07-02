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
      init: function() {
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
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
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
