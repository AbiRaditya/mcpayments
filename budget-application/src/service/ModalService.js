import Modal from "../components/Modal";

const ModalService = ({ children, modalTitle, closeModal, isModalOpen }) => {
  if (!isModalOpen) {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
    return null;
  } else {
    document.body.style.paddingRight = "0px";
    document.body.style.overflow = "unset";
  }

  return (
    <Modal onClose={closeModal} modalTitle={modalTitle}>
      {children}
    </Modal>
  );
};
export default ModalService;
