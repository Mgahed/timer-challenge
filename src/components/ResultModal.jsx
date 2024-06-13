// eslint-disable-next-line react/prop-types
import {forwardRef, useImperativeHandle, useRef} from "react";

const ResultModal = forwardRef(function ResultModal({result, targetTime, onReset}, ref) {

    const dialog = useRef();
    const lost = result <= 0;
    const score = Math.round((1 - result / targetTime) * 100);
    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            },
        }
    })

    return (
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {
                !lost &&
                <h2>You won! Your score is {score}%</h2>
            }
            {
                lost &&
                <h2>You lost</h2>
            }
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>
                You stopped the timer with <strong>{result.toFixed(2)} seconds left.</strong>
            </p>
            <button onClick={
                () => {
                    dialog.current.close();
                    onReset();
                }
            }>Close
            </button>
        </dialog>
    )
})

export default ResultModal;