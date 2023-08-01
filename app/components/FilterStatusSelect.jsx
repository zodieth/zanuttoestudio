import { filterStatus } from "../redux/features/peopleSlice";

const FilterStatusSelect = ({ useDispatch }) => {
  const dispatch = useDispatch();
  return (
    <div className="relative ">
      <label className="sr-only">Search</label>

      <select
        defaultValue={"Estado"}
        type="text"
        className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        onChange={(e) => dispatch(filterStatus(e.target.value))}
      >
        <option disabled>Estado</option>
        <option value="todos">Todos</option>
        <option value="consulta">Consulta</option>
        <option value="carpeta">Carpeta</option>
        <option value="derivado">Derivado</option>
      </select>
    </div>
  );
};

export default FilterStatusSelect;
