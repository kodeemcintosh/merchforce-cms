
import React, { useState } from 'react';
import { Modal } from './modal';

export function ImageViewer({ images, isViewerOpen, closeViewer }) {
  let defaultPrimaryImage = images.filter((img) => img.default === true).pop();

  const [ primaryImage, setPrimaryImage ] = useState(defaultPrimaryImage);
  const [ hoverImage, setHoverImage ] = useState({});

  // useEffects(() => {
  //   let defaultImage = images.filter((img) => img.default === true).pop();

  //   setPrimaryImage(defaultImage);
  // }, [images])


  const handlePrimaryImage = (img) => setPrimaryImage(img);
  const handleHoverReveal = (img) => setHoverImage(img);

  return(
    <Modal
      isOpen={isViewerOpen}
      close={closeViewer}
      >
      <div className="image-viewer">
        <div className="primary-image">
          <img src={primaryImage.src} alt={primaryImage.src} />
        </div>
        <div className="secondary-images">
          {images.map((img) => {
            let mask = img !== primaryImage || img !== hoverImage ? "mask" : "";

            // TODO: ADD a tooltip
            return (
              // <tooltip onHover={img.color}>
                <div className={`secondary-image ${mask}`} onHover={() => handleHoverReveal(img)} onClick={() => handlePrimaryImage(img)}>
                  <img src={img.src} alt={img.color || "No Image Available"} />
                </div>
              // </tooltip>
            )
          })}
        </div>
      </div>
    </Modal>
  );
}

// Props = {
//   images: [
//     {
//       color: 'purple',
//       src: '/local/images/defaultImg234353.png',
//       default: true
//     },
//     {
//       color: 'red',
//       src: '/local/images/defaultImg234354.png',
//       default: false
//     },
//     {
//       color: 'yellow',
//       src: '/local/images/defaultImg234355.png',
//       default: false
//     },
//     {
//       color: 'blue',
//       src: '/local/images/defaultImg234356.png',
//       default: false
//     }
//   ]
// }