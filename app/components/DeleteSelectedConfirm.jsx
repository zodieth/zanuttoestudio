import React from "react";
import { deleteUser, deleteDetail } from "../lib/utils";
import { changeLoading, deletePerson } from "../redux/features/peopleSlice";
import { useDispatch } from "react-redux";

function DeleteSelectedConfirm({ dataPerson, setDeleteSelected, dataDetails }) {
  const dispatch = useDispatch();

  const handleDeleteSelected = (dataPerson, dataDetails) => {
    dataPerson.map(async (element, index) => {
      if (dataDetails[index]._id !== undefined) {
        await deleteDetail(dataDetails[index]._id);
      }
      await deleteUser(element._id);
      dispatch(deletePerson(element._id));
    });
  };

  return (
    <div
      className="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "></div>

      <div className=" flex items-center justify-center fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="mb-1 text-center flex flex-col items-center justify-center text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Estás seguro que querés eliminar los usuarios seleccionados?
                  </h3>
                  <p className=" mx-4 text-1xl text-gray-500"></p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={() => [
                  dispatch(changeLoading(true)),
                  handleDeleteSelected(dataPerson, dataDetails),
                  setDeleteSelected(false),
                  dispatch(changeLoading(false)),
                ]}
              >
                Eliminar
              </button>
              <button
                onClick={() => [setDeleteSelected(false)]}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteSelectedConfirm;
