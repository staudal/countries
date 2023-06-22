import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ modal, setModal, selected }) {
  let URL = "";

  if (selected) {
    URL = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${selected.name.common}}`;
  }

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-7xl">
                <div className="flex flex-col justify-center">
                  <iframe className="rounded-t-md" height={600} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={URL}></iframe>
                  <button onClick={() => setModal(false)} className="w-full bg-indigo-500 text-white p-2">
                    Close modal
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
