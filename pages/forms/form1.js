import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Form1 from '../components/Form1';
import toast, { Toaster } from 'react-hot-toast';
import { Fetcher } from '@/lib/fetcher';



export default function Page() {
  //const { data: session } = useSession();
  const [buscando, setBuscando] = useState(["Intercambio de datos","Ofrecer servicios a través de apps","Ofrecer servicios de asesoramiento","Inscribir un conjunto de usuarios en el espacio de datos","No estoy seguro"]);
  const [tipologia, setTipologia] = useState(["Productores primarios","Empresas agroindustriales","Empresas auxiliares","Asesoramiento y consultoría","Organizaciones e instituciones","Responsables de otros Espacios de Datos"]);
  const [organizacion, setOrganizacion] = useState(["Administraciones públicas","Corporaciones de derecho público","Universidades"]);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await Fetcher.post('/api/uploadForm1', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.text())
        .then((_) => toast.success('Document created successfully'))
        .then(() => {
          router.push({
            pathname: `/`,
          });
        })
        .catch((err) => toast.error(err.message + ', this nº register may be registered'));
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
        <title>Form1</title>

      <main >
        <section>
          <div >
            <Form1
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

Page.auth = true;
