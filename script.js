const CONFIG = {
  phone: '054-933-4774',
  naverPlaceUrl: 'https://map.naver.com/p/search/%EC%9A%B0%EC%84%B1%EA%B3%B5%EC%9B%90%EB%AC%98%EC%9B%90/place/11544833',
  naverNaviUrl: 'https://map.naver.com/p/directions/-/3Aecx1,2zFio4,%EC%9A%B0%EC%84%B1%EA%B3%B5%EC%9B%90%EB%AC%98%EC%9B%90,11544833,PLACE_POI/-/car',
  shareTitle: '우성공원 준공식 초대장',
  shareText: '자연과 기억이 머무는 공간 우성공원에서 귀한 분들을 초대합니다.',
};

function initAnimations() {
  setTimeout(() => {
    document.querySelectorAll('.anim').forEach(el => el.classList.add('visible'));
  }, 60);
}

function initButtons() {
  document.getElementById('btn-place').addEventListener('click', () => {
    window.open(CONFIG.naverPlaceUrl, '_blank');
  });

  document.getElementById('btn-navi').addEventListener('click', () => {
    window.open(CONFIG.naverNaviUrl, '_blank');
  });

  document.getElementById('btn-contact').addEventListener('click', () => {
    window.location.href = 'tel:' + CONFIG.phone.replace(/-/g, '');
  });

  document.getElementById('btn-share').addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: CONFIG.shareTitle,
          text: CONFIG.shareText,
          url: window.location.href,
        });
      } catch (_) {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('링크가 복사되었습니다.');
      } catch (_) {
        showToast('링크를 직접 복사해주세요.');
      }
    }
  });

  const placeName = document.getElementById('place-name');
  if (placeName) {
    placeName.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(CONFIG.naverPlaceUrl, '_blank');
    });
  }
}

function showToast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('show'));
  });
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initButtons();
});
