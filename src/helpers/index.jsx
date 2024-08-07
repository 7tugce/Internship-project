import React from 'react';

// Metni yeni satır karakterlerine göre bölüp <br> ile birleştiren yardımcı fonksiyon
export const formatTextWithNewLines = (text) => {
  if (!text) {
    return null; // Eğer text tanımsız veya boşsa, null döndür
  }
  
  return text.split('\n').map((item, index) => (
    <React.Fragment key={index}>
      {item}
      <br />
    </React.Fragment>
  ));
};
