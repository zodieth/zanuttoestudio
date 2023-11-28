import { filterCita } from "../redux/features/citaSlice";
import { useSelector } from "react-redux";


const FilterStatusSelect = ({ useDispatch }) => {
    const oficinas = useSelector((state) => state.calendario);
    const dispatch = useDispatch();
    return (
        <div className="relative ">
        <label className="sr-only">Search</label>
        {oficinas.isLoading? (
            <div>Cargando oficinas</div>
        ) : (
            <select
                defaultValue={"Oficinas"}
                type="text"
                className="mb-3 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                onChange={(e) => dispatch(filterCita(e.target.value))}
            >
                <option disabled>Oficinas</option>
                <option value="todos">Todos</option>
                {oficinas.calendario.map((oficina) => {
                    return (
                        <option value={oficina.nombre}>{oficina.nombre}</option>
                    )
                })}
            </select>
        )
        }

        </div>
    );
};

export default FilterStatusSelect;
