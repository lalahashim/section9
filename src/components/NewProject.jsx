import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({onAdd, onCancel}){
    const modal = useRef();

    const titleRef = useRef();
    const descRef = useRef();
    const dueDate = useRef();

    function handleSaveBtn(){
        const enteredTitle = titleRef.current.value;
        const enteredDesc = descRef.current.value;
        const enteredDueDate = dueDate.current.value;

        if (enteredTitle.trim() === '' || enteredDesc.trim() === '' || enteredDueDate.trim() === ''){
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDesc,
            dueDate: enteredDueDate
        })
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl text-bold text-stone-800 my-4">Invalid input</h2>
                <p className=" text-stone-600">Oops ... looks like you forgot to enter a value.</p>
                <p className="mb-4 text-stone-600">Please make sure you provide a valid value for every input field.</p>
            </Modal>

            <div className="w-1/3 mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950"
                                onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                                onClick={handleSaveBtn}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={titleRef} label="Title" />
                    <Input ref={descRef} label="Description" textarea/>
                    <Input type="date" ref={dueDate} label="Due date"/>
                </div>
            </div>
        </>
    )
}