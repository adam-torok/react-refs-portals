import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const resultModal = forwardRef(function ResultModal({ onReset, targetTime, remainingTime }, ref) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                console.log('opening the modal');
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            <h2>You have {!userLost ? 'won' : 'lost'}</h2>
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was {targetTime} seconds.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>, document.querySelector('#modal')
    );
})

export default resultModal;