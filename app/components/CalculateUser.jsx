import React from "react";

function CalculateUser({ user, setCalculateUser }) {
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
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex items-center justify-center ">
                    <div className="flex items-center justify-center ">
                      <h3
                        className="w-full mx-1 text-center flex flex-col items-center justify-center text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Cantidad de aportes:
                      </h3>
                      <input
                        type="number"
                        id="aportes"
                        disabled
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        defaultValue={
                          Number(user.hasta2008) +
                          Number(user.desde2009) +
                          Number(user.hasta2012) +
                          Number(user.desde2012)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <h3
                        className="w-full mx-1 text-center flex flex-col items-center justify-center text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Tareas de cuidado:
                      </h3>
                      <input
                        type="number"
                        id="aportes"
                        disabled
                        className=" w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        defaultValue={
                          user.hijos * 12 +
                          user.hijosAdoptados * 24 +
                          user.hijosDiscapacidad * 24 +
                          user.auh * 12
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={() => [setCalculateUser(false)]}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculateUser;
