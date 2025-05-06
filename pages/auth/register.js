import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Register from '../components/Register';
import toast, { Toaster } from 'react-hot-toast';
import { Fetcher } from '@/lib/fetcher';



export default function Page() {
  const [buscando, setBuscando] = useState(["Intercambio de datos","Ofrecer servicios a través de apps","Ofrecer servicios de asesoramiento","Inscribir un conjunto de usuarios en el espacio de datos","No estoy seguro"]);
  const [tipologia, setTipologia] = useState(["Productores primarios","Empresas agroindustriales","Empresas auxiliares","Asesoramiento y consultoría","Organizaciones e instituciones","Responsables de otros Espacios de Datos"]);
  const [organizacion, setOrganizacion] = useState(["Administraciones públicas","Corporaciones de derecho público","Universidades"]);
  const router = useRouter();

  const onSubmit = async (data) => {
    if (data.Contraseña !== data.repetirContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log(response)
      const result = await response.json();
      console.log(result)
      if (response.ok) {
        alert('Usuario registrado con éxito. Ahora puede iniciar sesión.');
        router.push('login');
      } else {
        alert(result.message || 'Error al registrar usuario.');
      }
    } catch (error) {
      alert('Hubo un problema con el registro. Inténtelo más tarde.');
      console.error('Error:', error);
    }
  };

  return (
    <>
        <title>Register</title>

      <main >
        <section>
          <div >
            <Register
              onSubmit={onSubmit}
              buscando={buscando} 
              setBuscando={setBuscando} 
              tipologia={tipologia} 
              setTipologia={setTipologia} 
              organizacion={organizacion} 
              setOrganizacion={setOrganizacion}
            />
          </div>
        </section>
      </main>
    </>
  );
}