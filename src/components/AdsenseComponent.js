import React, { useEffect } from 'react';

const AdsenseComponent = ({ adClient, adSlot, adFormat = 'auto', fullWidthResponsive = true }) => {
  useEffect(() => {
    // 광고 스크립트가 페이지에 없으면 로드하기
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      document.head.appendChild(script);
      
      // 스크립트가 로드된 후 광고를 삽입하도록 설정
      script.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('Adsense error:', e);
        }
      };
    } else {
      // 이미 스크립트가 로드되었으면 바로 push 호출
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Adsense error:', e);
      }
    }
  }, []); // 의존성 배열이 비어있어 최초 렌더링 시에만 실행됨

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    ></ins>
  );
};

export default AdsenseComponent;
