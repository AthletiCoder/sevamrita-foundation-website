import React, { useEffect, useId, useRef } from 'react';

/**
 * Full-screen PDF viewer overlay.
 * Uses the native <dialog> so Esc and focus management are built-in.
 */
const DocumentViewer = ({ doc, onClose }) => {
  const dialogRef = useRef(null);
  const titleId = useId();
  const isOpen = Boolean(doc?.href);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const requestClose = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
      return;
    }
    onClose?.();
  };

  const handleDialogClose = () => {
    onClose?.();
  };

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) {
      requestClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="resource-doc-viewer"
      aria-labelledby={titleId}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
    >
      {doc?.href ? (
        <div
          className="resource-doc-viewer__panel"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="resource-doc-viewer__header">
            <h2 id={titleId} className="resource-doc-viewer__title">
              {doc.label}
            </h2>
            <div className="resource-doc-viewer__actions">
              <button
                type="button"
                className="resource-doc-viewer__close"
                onClick={requestClose}
                aria-label="Close document viewer"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
                <span>Close</span>
              </button>
            </div>
          </header>

          <div className="resource-doc-viewer__body">
            <iframe
              key={doc.href}
              src={doc.href}
              title={doc.label}
              className="resource-doc-viewer__frame"
            />
          </div>
        </div>
      ) : null}
    </dialog>
  );
};

export default DocumentViewer;
