import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";
import Button from "./Button";

export default function Modal({ref, children, buttonCaption}){
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md"> 
            {children} 
            <form method="dialog" className="text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>, 
        document.getElementById("modal-root")
    );
}