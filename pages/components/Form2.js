import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const FormInput = ({ type, step, name, label, error, register, required, disabled }) => (
  <div className="mb-12">
    <label htmlFor={name} className="block text-base text-gray-800 mb-4">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      placeholder="Escriba su respuesta"
      autoComplete="off"
      type={type}
      step={step}
      id={name}
      disabled={disabled}
      className="w-full bg-white rounded px-3 py-2 text-sm text-gray-800 focus:outline-none disabled:bg-gray-100"
      {...register(name, { required })}
    />
    {error && <p className="text-sm text-red-600 font-medium mt-1">{error}</p>}
  </div>
);

const FormSelect = ({ name, label, error, register, options, required, setValue }) => (
  <div className="mb-12">
    <label htmlFor={name} className="block text-base text-gray-800 mb-4">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <select
      defaultValue=""
      id={name}
      className="w-2/4 bg-[#fff] rounded px-3 py-2 text-sm text-gray-800 focus:outline-none"
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
    <label className="block text-base text-gray-800 mb-4">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <div>
      {options.map((option, index) => (
        <label
          key={index}
          className="flex items-center space-x-2 text-sm text-gray-800 mb-4"
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


const Form2 = ({ onSubmit, cultivo, setCultivo, porcentaje, setPorcentaje, facturacion, setFacturacion }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen  py-10 px-4 font-sans ">
      <div className="max-w-3xl mx-auto bg-gray-50/96 p-10 rounded-lg shadow border border-gray-200 shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">CE_F01</h1>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          Este formulario permite completar la información necesaria para categorizar a la empresa dentro del EDAAn. Se recopilan datos detallados, como la tipología dentro del sector y otros aspectos clave, que facilitarán su adecuada clasificación. <br />
        </p>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          La información proporcionada en esta etapa es fundamental para personalizar la experiencia y dirigir a la empresa hacia las oportunidades y recursos más adecuados.
        </p>
        <p className="text-gray-700 text-sm mb-6">
          ✅ Complete la categorización para avanzar en el proceso.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput type="text" name="Trabajadores" label="1. Número de trabajadores (aproximado):" error={errors.Trabajadores?.message} register={register} required />
          <FormInput type="text" name="Superficie" label="2. Total de superficie agraria de base territorial sobre la que se sustenta su negocio de producción o transformación (hectáreas):" error={errors.Superficie?.message} register={register} required />
          <FormSelect name="Cultivo" label="3. Lista cerrada con el cultivo que representa la mayor parte de su negocio:" error={errors.Cultivo?.message} register={register} options={cultivo} setValue={setValue} required />
          <FormSelect name="Porcentaje" label="4. ¿Cuál es el porcentaje (aproximado) que representa el cultivo anterior sobre el total?" error={errors.Porcentaje?.message} register={register} options={porcentaje} setValue={setValue} required />
          <FormInput type="text" name="Informacion" label="5. Información adicional que considere relevante en relación con los cultivos representativos de su negocio" error={errors.Informacion?.message} register={register} required />
          <FormInput type="text" name="Ambito" label="6. ¿Cuál es el ámbito geográfico de la superficie agraria en la que opera su negocio respecto a los cultivos citados?" error={errors.Ambito?.message} register={register} required />
          <FormRadio name="Facturacion" label="7. Facturación anual de la entidad:" error={errors.Facturacion?.message} register={register} options={facturacion} setValue={setValue} required />

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

export default Form2;
