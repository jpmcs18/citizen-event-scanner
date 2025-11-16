import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { stubViewerActions } from '../../state/reducers/stub-viewer-reducer';
import html2canvas from 'html2canvas';
import { printImage, to12HoursTimeDisplay, toDateMMddyyyy } from '../../helper';
import mainLogo from '../../icons/Main Logo.png';

export default function StubViewerMainDisplay() {
  const stubViewerState = useSelector((state: RootState) => state.stubViewer);
  const dispatch = useDispatch();
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(
    () => {
      if (imageRef.current) {
        if (imageRef.current) {
          imageRef.current.src = stubViewerState.stub?.qrCodeBase64!;
          if (stubViewerState.isAutoPrint) {
            dispatch(stubViewerActions.setInitiateAutoPrint(true));
          }
        }
      }
    },
    //eslint-disable-next-line
    [stubViewerState.isModalShow]
  );
  useEffect(
    () => {
      if (
        stubViewerState.isAutoPrint &&
        stubViewerState.initiateAutoPrint &&
        imageRef.current
      ) {
        printQR();
        dispatch(stubViewerActions.setShowModal(false));
      }
    },
    //eslint-disable-next-line
    [stubViewerState.initiateAutoPrint]
  );

  function printQR() {
    var height = 850;
    var width = 400;
    html2canvas(document.getElementById('stub-content') as HTMLElement, {
      width,
      height,
    }).then(function (canvas) {
      var myImage = canvas.toDataURL();
      printImage(myImage, height, width);
    });
  }

  return (
    <div className='container'>
      <div className='stub-content' id='stub-content'>
        <div className='main-logo'>
          <img src={mainLogo} alt='seal' />
        </div>
        <div className='title'>{stubViewerState.stub?.eventName}</div>
        <div className='text'>
          SCANNED DATE: {toDateMMddyyyy(stubViewerState.stub?.scanClaimedOn)}
        </div>
        <div className='text'>
          TIME: {to12HoursTimeDisplay(stubViewerState.stub?.scanClaimedOn)}
        </div>
        <div className='text'>
          CITIZEN's BARANGAY: {stubViewerState.stub?.barangay}
        </div>
        <div className='stub'>
          <img ref={imageRef} alt='QRCode' />
        </div>
        <div className='text'>
          SCANNED BY: {stubViewerState.stub?.scanClaimedByUser}
        </div>
      </div>

      {!stubViewerState.isAutoPrint && (
        <div className='btn-container'>
          <button className='btn color-blue' onClick={printQR}>
            Print
          </button>
        </div>
      )}
    </div>
  );
}
