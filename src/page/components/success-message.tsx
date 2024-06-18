import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function SuccessMessage({
  onContinue,
  message,
}: {
  onContinue: () => void;
  message: string;
}) {
  return (
    <div className='message-success'>
      <div className='header'>
        <FontAwesomeIcon icon={faCheck} className='success' />
        <h1>Congratulations!</h1>
        <label>{message}</label>
      </div>
      <div className='btn-actions-group'>
        <button className='btn-action' onClick={onContinue}>
          CONTINUE
        </button>
      </div>
    </div>
  );
}
