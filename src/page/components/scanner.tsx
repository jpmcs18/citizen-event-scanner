import React, { useEffect, useRef, useState } from 'react';
import qrLogo from '../../icons/qrcode.png';
export default function Scanner({
  onRead,
}: {
  onRead: (qrCode: string) => void;
}) {
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState('');
  const txtRef = useRef<HTMLInputElement>(null);
  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setTyping(false);
        if (!!value) {
          onRead(value);
        }
      }, 100);

      return () => clearTimeout(timeout);
    },
    // eslint-disable-next-line
    [value]
  );
  useEffect(
    () => {
      focusOnScanner();
    },
    //eslint-disable-next-line
    []
  );

  function focusOnScanner() {
    const timeout = setTimeout(() => {
      if (txtRef.current) txtRef.current.focus();
      clearTimeout(timeout);
    }, 100);
  }
  return (
    <div
      id='scanner-main-container'
      className='scanner-main-container'
      onClick={focusOnScanner}>
      <div className='scanner-container'>
        <input
          style={{ opacity: '0' }}
          type='text'
          value={value}
          ref={txtRef}
          autoFocus={true}
          onChange={(e) => {
            if (!typing) {
              if (txtRef.current)
                txtRef.current.value =
                  txtRef.current.value[txtRef.current.value.length - 1];
              setTyping(true);
            }
            setValue(e.target.value);
          }}
        />
        <div className='scanner-content'>
          <div className='image-container'>
            <img src={qrLogo} alt='QR' />
          </div>
          <div className='scanner'></div>
        </div>
      </div>
    </div>
  );
}
