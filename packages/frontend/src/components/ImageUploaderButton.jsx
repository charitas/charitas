import React from 'react';
import ReactDom from 'react-dom';

export default function ImageUploaderButton({ uploadButtonElement, launchImageUploadModal }) {
  if (uploadButtonElement) {
    return ReactDom.createPortal(
      (
        <button onClick={launchImageUploadModal} className="firepad-btn firepad-tb-insert-image" />
      ),
      uploadButtonElement,
    );
  }
  return null;
}
