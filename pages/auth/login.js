import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Login() {
  const [Correo, setCorreo] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      Correo: data.email,
      Contraseña: data.password,
    });
  
    if (res.ok) {
      router.push("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };
  

  return (
    <>
          <main className="mx-auto max-w-lg px-4 sm:px-6 md:px-8">
        <section className="my-16">
          <div className="max-w-3xl mx-auto bg-gray-50/96 p-10 rounded-lg shadow border border-gray-200 shadow-xl">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Inicia sesión en tu cuenta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="john.doe@company.com"
                    onChange={(e) => setCorreo(e.target.value)}
                    {...register('email', { required: 'Por favor, introduce un correo' })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="•••••••••"
                    onChange={(e) => setContraseña(e.target.value)}
                    {...register('password', { required: 'Por favor, introduce una contraseña' })}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Inciar sesión
                </button>
                <div className="inline-flex items-center space-x-4">
              <p>
                ¿No tienes una cuenta?{' '}
                <Link href="/auth/register">
                  Registrarse
                </Link>
              </p>
                  </div>
              </form>
            </div>
          </div>
        </section>
      </main>

    </>

  
);
}