import { useEffect, useRef, useState } from 'react';
export default function BarcodeScanner({
  onRead,
}: {
  onRead: (qrCode: string) => void;
}) {
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState('');
  const txtRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
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
      if (txtRef.current) {
        txtRef.current.focus();
        setHasFocus((x) => true);
      }
      clearTimeout(timeout);
    }, 100);
  }
  return (
    <div
      id='barcode-scanner-main-container'
      className={
        'barcode-scanner-main-container ' + (hasFocus ? 'bg-green' : 'bg-red')
      }
      onClick={focusOnScanner}>
      <div className='scanner-container'>
        <input
          onBlur={() => setHasFocus((x) => false)}
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
        {hasFocus ? (
          <div className='scanning-status'>Barcode scanner is active</div>
        ) : (
          <div className='scanning-status'>
            Clich here to activate barcode scanner
          </div>
        )}
      </div>
    </div>
  );
}
