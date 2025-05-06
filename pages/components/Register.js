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

const FormRadio = ({ name, label, error, register, options, required, setValue }) => (
  <div className="mb-6">
    <label className="block text-base text-[#242424] mb-4">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <div>
      {options.map((option, index) => (
        <label
          key={index}
          className="flex items-center space-x-2 text-sm text-[#242424] mb-4"
        >
          <input
            type="radio"
            value={option}
            {...register(name)}
            onChange={() => setValue(name, option)}
            className="h-4 w-4 border-gray-400 text-blue-600 focus:ring-blue-600"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
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



const Register = ({ onSubmit, buscando, setBuscando, tipologia, setTipologia, organizacion, setOrganizacion }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedTipologia = watch("Tipologia");

  return (
    <div className="min-h-screen  py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-gray-50/96 p-10 rounded-lg shadow border border-gray-200 shadow-xl">
        <h1 className="text-2xl font-semibold text-[#242424] mb-4">MI_F01
        </h1>
        <p className="text-[#242424] mb-4 text-sm leading-relaxed">
          Este formulario permite a los interesados registrar su intención de participar en el <strong>EDAAn</strong>.
          Se recopilan datos básicos como el nombre legal de la empresa, motivo de interés y datos de contacto.
          Una vez enviado, el sistema genera automáticamente un <strong>usuario</strong> y <strong>contraseña</strong> y los envía por correo para acceso a futuras gestiones. 🚀
        </p>
        <p className="text-sm font-semibold text-[#242424] mb-8 leading-relaxed">¡Comience su registro!</p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-sm text-[#242424] mb-4"><span className="text-red-600 mr-1">*</span>Obligatorio</p>

          <FormSelect name="buscando" label="1. ¿Qué está buscando?" error={errors.buscando?.message} register={register} options={buscando} setValue={setValue} required />
          <FormInput type="text" name="Nombre" label="2. Nombre" error={errors.Nombre?.message} register={register} required />
          <FormInput type="text" name="Apellidos" label="3. Apellidos" error={errors.Apellidos?.message} register={register} required />
          <FormInput type="email" name="Correo" label="4. Correo" error={errors.Correo?.message} register={register} required />
          <FormInput type="password" name="Contraseña" label="5. Contraseña" error={errors.Contraseña?.message} register={register} required />
          <FormInput type="password" name="repetirContraseña" label="6. Repetir contraseña" error={errors.repetirContraseña?.message} register={register} required />
          <FormSelect name="Tipologia" label="7. Indique la tipología del agente del sector agroalimentario:" error={errors.tipologia?.message} register={register} options={tipologia} setValue={setValue} required />
          {selectedTipologia !== "" &&(
            <>
            {
          (selectedTipologia === "Organizaciones e instituciones" ) ? (
            <>
              <FormCheckboxGroup
                name="Organizacion"
                label="8. ¿Qué tipo de organización/institución?"
                options={organizacion}
                register={register}
                setValue={setValue}
                getValues={getValues}
                error={errors.Organizacion?.message}
                required
              />
              <FormInput type="text" name="razon" label="9. Razón Social (nombre legal de la empresa)" error={errors.razon?.message} register={register} required />
              <FormInput type="text" name="identificacion" label="10. Número de Identificación Fiscal (NIF)" error={errors.identificacion?.message} register={register} required />
              <FormInput type="text" name="pais" label="11. País del domicilio social" error={errors.pais?.message} register={register} required />
              <FormInput type="url" name="url" label="12. URL" error={errors.url?.message} register={register} required />
            </>
          ) :
            <>
              <FormInput type="text" name="razon" label="8. Razón Social (nombre legal de la empresa)" error={errors.razon?.message} register={register} required />
              <FormInput type="text" name="identificacion" label="9. Número de Identificación Fiscal (NIF)" error={errors.identificacion?.message} register={register} required />
              <FormInput type="text" name="pais" label="10. País del domicilio social" error={errors.pais?.message} register={register} required />
              <FormInput type="url" name="url" label="11. URL" error={errors.url?.message} register={register} required />

            </>

            }
            </>
          )
          }

          <button
            type="submit"
            className="bg-[#8D8F93] text-white px-4 py-2 rounded hover:bg-[#75767a]"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
