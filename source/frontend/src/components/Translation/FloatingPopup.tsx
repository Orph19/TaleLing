import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow, // 1. Import the arrow middleware
} from '@floating-ui/react-dom';

// It's good practice to create a CSS class for the arrow's base styles.
// We will create this CSS file in the next step.
import './FloatingPopup.css';

interface FloatingPopupProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
}

const FloatingPopup: React.FC<FloatingPopupProps> = ({ anchorEl, onClose, children }) => {
  // 2. Create a ref to hold the arrow element
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const {
    x,
    y,
    strategy,
    refs,
    isPositioned,
    placement, // 3. Get the final placement for positioning the arrow
    middlewareData, // 4. Get the middleware data which will contain the arrow's coordinates
  } = useFloating({
    // Keep autoUpdate for responsive positioning
    whileElementsMounted: autoUpdate,
    placement: 'top',
    middleware: [
      offset(10), // Increased offset to give the arrow some space
      flip(),
      shift({ padding: 8 }),
      // 5. Add the arrow middleware, telling it which element to use
      arrow({ element: arrowRef }),
    ],
  });

  // Safely connect the anchor element after render (no changes here)
  useEffect(() => {
    refs.setReference(anchorEl);
  }, [refs, anchorEl]);

  // Click outside handler (no changes here)
  const popupRef = refs.floating;
  useEffect(() => {
    if (!isPositioned) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (anchorEl?.contains(target)) {
        return;
      }
      if (popupRef.current && !popupRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef, anchorEl, isPositioned, onClose]);

  // 6. Calculate the arrow's dynamic styles based on middleware data
  // This positions the arrow and points it in the correct direction.
  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;
  
  // This determines which side of the popup the arrow is on (e.g., 'bottom' if placement is 'top')
  // It's used to correctly "stick" the arrow to the edge of the pop-up.
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]] as string;


  // Use a portal to render the popup at the top level of the document body (no changes here)
  return createPortal(
    <div
      ref={refs.setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        visibility: isPositioned ? 'visible' : 'hidden',
        zIndex: 9999,
      }}
    >
      {/* --- RENDER THE ARROW --- */}
      {/* 7. The arrow element itself, with its ref and dynamic styles */}
      <div
        ref={arrowRef}
        className="floating-popup-arrow"
        data-placement={placement} // Pass the final placement to the element
        style={{
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          [staticSide]: '-4px', // Pulls the arrow halfway out to overlap the border
        }}
      />
      {children}
    </div>,
    document.body
  );
};

export default FloatingPopup;