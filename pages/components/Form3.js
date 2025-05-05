import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const FormInput = ({ type, step, name, label, error, register, required, disabled }) => (
  <div className="mb-12">
    <label htmlFor={name} className="block text-base text-[#242424] mb-4">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
    placeholder="Escriba su respuesta"
      autoComplete="off"
      type={type}
      step={step}
      id={name}
      disabled={disabled}
      className="w-full bg-white rounded px-3 py-2 text-sm text-[#242424] focus:outline-none disabled:bg-gray-100"
      {...register(name, { required })}
    />
    {error && <p className="text-sm text-red-600 font-medium mt-1">{error}</p>}
  </div>
);

const FormSelect = ({ name, label, error, register, options, required, setValue }) => (
  <div className="mb-12">
    <label htmlFor={name} className="block text-base text-[#242424] mb-4">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <select
      defaultValue=""
      id={name}
      className="w-2/4 bg-[#fff] rounded px-3 py-2 text-sm text-[#242424] focus:outline-none"
      {...register(name, {
        validate: value => value !== "" || "Esta pregunta es obligatoria."
      })}
      onChange={(e) => setValue(name, e.target.value)}
    >
      <option disabled hidden value="">Selecciona la respuesta</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600 font-medium mt-1">{error}</p>}
  </div>
);


const FormCheckboxGroup = ({ name, label, options, register, setValue, getValues, error, required }) => {
  const initialValues = getValues(name) || [];

  const initialStandardOptions = initialValues.filter(opt => options.includes(opt));
  const initialCustomOption = initialValues.find(opt => !options.includes(opt)) || "";

  const [selectedOptions, setSelectedOptions] = useState(initialStandardOptions);
  const [customOption, setCustomOption] = useState(initialCustomOption);
  const [customChecked, setCustomChecked] = useState(initialCustomOption !== "");

  useEffect(() => {
    register(name, {
      validate: (value) =>
        value && value.length > 0 ? true : "Debes seleccionar al menos una opción"
    });
  }, [register, name]);

  useEffect(() => {
    const finalValues = [
      ...selectedOptions,
      ...(customChecked && customOption.trim() !== "" ? [customOption] : [])
    ];
    setValue(name, finalValues);
  }, [selectedOptions, customOption, customChecked, setValue, name]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
  };

  const handleCustomInputChange = (e) => {
    const value = e.target.value;
    setCustomOption(value);
    setCustomChecked(value.trim() !== "");
  };

  const handleCustomCheckboxChange = () => {
    if (customChecked) setCustomOption("");
    setCustomChecked(!customChecked);
  };

  return (
    <div className="mb-12 ">
      <label className="block text-base text-[#242424] mb-4">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 text-sm text-[#242424] mb-4">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="h-4 w-4 mt-1 accent-gray-400"
              />
            <span>{option}</span>
          </label>
        ))}

        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            checked={customChecked}
            onChange={handleCustomCheckboxChange}
            className="h-4 w-4 mt-1 accent-gray-400"
            />
          <input
            type="text"
            value={customOption}
            onChange={handleCustomInputChange}
            placeholder="Otras"
            className="flex-1 bg-[#fff] rounded px-3 py-2 text-sm text-[#242424] focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 font-medium mt-1">{error}</p>}
    </div>
  );
};


const Form3 = ({
  onSubmit,
  rol, setRol,
  tematicaProveedor, setTematicaProveedor,
  infraestructura, setInfraestructura,
  frecuencia, setFrecuencia,
  escalabilidad, setEscalabilidad,
  soporte, setSoporte,
  tematicaConsumidor, setTematicaConsumidor,
  auditorias, setAuditorias,
  acceso, setAcceso
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const selectedRol = watch("Rol");
  const [currentPage, setCurrentPage] = useState(1);

  const getRequiredFieldsForPage = () => {
    if (currentPage === 1) return ["Rol"];
    if (currentPage === 2) {
      if (selectedRol === "Proveedor de datos") return ["TematicasProveedor"];
      if (selectedRol === "Consumidor de datos") return ["TematicasConsumidor"];
    }
    if (currentPage === 3) {
      if (selectedRol === "Proveedor de datos")
        return ["Infraestructura", "Frecuencia", "Escalabilidad", "Soporte"];
      if (selectedRol === "Consumidor de datos")
        return ["Auditoria", "Acceso"];
    }
    return [];
  };

  const handleNext = async () => {
    const fieldsToValidate = getRequiredFieldsForPage();
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen  py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-gray-50/96 p-10 rounded-lg shadow border border-gray-200 shadow-xl">
        <h1 className="text-2xl font-semibold text-[#242424] mb-4">EN_F01</h1>

        {currentPage === 1 && (
          <div>
            <p className="text-[#242424] mb-4 text-sm leading-relaxed">
              Este formulario permite identificar el rol de la empresa dentro del EDAAn, ya sea como <strong>proveedor</strong> o <strong>consumidor de datos</strong>.
            </p>
            <p className="text-[#242424] mb-4 text-sm">La evaluación de estos aspectos es clave para asignar los recursos adecuados y optimizar la integración de la empresa en el ecosistema.</p>
            <p className="text-sm text-[#242424] mb-6">✅ Complete la evaluación para finalizar el proceso de incorporación.</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
          <p className="text-sm text-[#242424] mb-4"><span className="text-red-600 mr-1">*</span>Obligatorio</p>

          {currentPage === 1 && (
            <div>
              <h2 className="text-lg text-[#75767A] mt-4 mb-6">ROL DE ACCESO</h2>
              <FormSelect
                name="Rol"
                label="1. Indique su rol para acceder al EDAAn:"
                error={errors.Rol?.message}
                register={register}
                options={rol}
                setValue={setValue}
                required
              />
            </div>
          )}

          {selectedRol === "Proveedor de datos" && currentPage === 2 && (
            <>
              <h2 className="text-lg text-[#75767A] mt-4 mb-6">PROVEEDOR - Casos de Uso</h2>
              <FormCheckboxGroup
                name="TematicasProveedor"
                label="2. ¿En qué temática estás interesado?"
                options={tematicaProveedor}
                register={register}
                setValue={setValue}
                getValues={getValues}
                error={errors.TematicasProveedor?.message}
                required
              />
              <FormInput
                type="text"
                name="MotivacionProveedor"
                label="3. Trate de aportarnos, en la medida de lo posible, la motivación que tiene para participar en el Espacio de Datos Federado Agroalimentario de Andalucía, qué servicios espera recibir y/o aportar, así como cualquier otra cuestión que pueda permitirnos ayudarle en su proceso de incorporación."
                error={errors.MotivacionProveedor?.message}
                register={register}
              />
            </>
          )}

          {selectedRol === "Proveedor de datos" && currentPage === 3 && (
            <>
              <h2 className="text-lg text-[#75767A] mt-4 mb-6">PROVEEDOR - Infraestructura</h2>
              <FormSelect name="Infraestructura" label="4. ¿Cuenta con infraestructura?" error={errors.Infraestructura?.message} register={register} options={infraestructura} setValue={setValue} required />
              <FormSelect name="Frecuencia" label="5. ¿Con qué frecuencia actualiza los datos?" error={errors.Frecuencia?.message} register={register} options={frecuencia} setValue={setValue} required />
              <FormSelect name="Escalabilidad" label="6. ¿Cómo gestiona la escalabilidad?" error={errors.Escalabilidad?.message} register={register} options={escalabilidad} setValue={setValue} required />
              <FormSelect name="Soporte" label="7. ¿Nivel de soporte técnico?" error={errors.Soporte?.message} register={register} options={soporte} setValue={setValue} required />
            </>
          )}

          {selectedRol === "Consumidor de datos" && currentPage === 2 && (
            <>
              <h2 className="text-lg text-[#75767A] mt-4 mb-6">CONSUMIDOR - Casos de Uso</h2>
              <FormCheckboxGroup
                name="TematicasConsumidor"
                label="2. ¿En qué temática estás interesado?"
                options={tematicaConsumidor}
                register={register}
                setValue={setValue}
                getValues={getValues}
                error={errors.TematicasConsumidor?.message}
                required
              />
              <FormInput
                type="text"
                name="MotivacionConsumidor"
                label="3. Trate de aportarnos, en la medida de lo posible, la motivación que tiene para participar en el Espacio de Datos Federado Agroalimentario de Andalucía, qué servicios espera recibir y/o aportar, así como cualquier otra cuestión que pueda permitirnos ayudarle en su proceso de incorporación."
                error={errors.MotivacionConsumidor?.message}
                register={register}
              />
            </>
          )}

          {selectedRol === "Consumidor de datos" && currentPage === 3 && (
            <>
              <h2 className="text-lg text-[#75767A] mt-4 mb-6">CONSUMIDOR - Infraestructura</h2>
              <FormSelect name="Auditoria" label="4. ¿Cuenta con procesos de auditoría?" error={errors.Auditoria?.message} register={register} options={auditorias} setValue={setValue} required />
              <FormSelect name="Acceso" label="5. ¿Cómo gestiona el acceso a los datos?" error={errors.Acceso?.message} register={register} options={acceso} setValue={setValue} required />
            </>
          )}

          <div className="justify-between mt-6">
            {currentPage > 1 && (
              <button type="button" onClick={handleBack} className=" text-[#323130] bg-[#fff] px-4 py-2 rounded-lg hover:bg-transparent mr-10">
                Atrás
              </button>
            )}

            {currentPage < 3 &&  (
              <button type="button" onClick={handleNext} className="bg-[#8D8F93] text-white px-4 py-2 rounded hover:bg-[#75767a]">
                Siguiente
              </button>
            )}

            {currentPage === 3 && (
              <button type="submit" className="bg-[#8D8F93] text-white px-4 py-2 rounded hover:bg-[#75767a]">
                Enviar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form3;
