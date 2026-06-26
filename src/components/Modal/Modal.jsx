import { useEffect, useRef } from "react"
import "./Modal.css"

/**
 * Modal — composant React (remplace jquery.modal.js)
 *
 * Affiche une fenêtre modale par-dessus le contenu de la page.
 * Peut être fermée via le bouton ✕, un clic sur l'overlay, ou la touche Escape.
 *
 * @param {boolean}  isOpen   - Contrôle la visibilité de la modale.
 * @param {function} onClose  - Callback appelé à la fermeture.
 * @param {node}     children - Contenu affiché dans la modale.
 */
function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  // Fermeture native Escape + clic sur le backdrop (<dialog> le gère nativement)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleCancel = (e) => { e.preventDefault(); onClose() }
    const handleClick  = (e) => {
      const rect = dialog.getBoundingClientRect()
      const outside =
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom
      if (outside) onClose()
    }
    dialog.addEventListener("cancel", handleCancel)
    dialog.addEventListener("click",  handleClick)
    return () => {
      dialog.removeEventListener("cancel", handleCancel)
      dialog.removeEventListener("click",  handleClick)
    }
  }, [onClose])

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
