import React from 'react';

const ModalEliminar = ({ isOpen, closeModal, onConfirm, message, title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay2" onClick={closeModal}>
      <div className="modal2" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header2">
          <h2>{title}</h2>
          <button onClick={closeModal}>&times;</button>
        </div>
        <div className="modal-content2">
          <p>{message}</p>
        </div>
        <div className="modal-footer2">
          <button onClick={closeModal}>Cancelar</button>
          <button onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminar;
