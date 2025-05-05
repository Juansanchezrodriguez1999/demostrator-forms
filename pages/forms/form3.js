import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Form3 from '../components/Form3';
import toast, { Toaster } from 'react-hot-toast';
import { Fetcher } from '@/lib/fetcher';

export default function Page() {
  //const { data: session } = useSession();
  const router = useRouter();
  const [rol, setRol] = useState(["Proveedor de datos", "Consumidor de datos"]);
  const [tematicaProveedor, setTematicaProveedor] = useState(["Estrés hídrico en cultivos (humedad del suelo, clima, irrigación, etc.)", "Producción y rendimiento de cosechas (históricos de producción, condiciones de cultivo, etc.)", "Presencia y evolución de enfermedades en cultivos (imágenes, reportes fitosanitarios, sensores, etc.)", "Uso de agua subterránea (datos de pozos, caudales extraídos, ubicación de usuarios, etc.)"]);
  const [infraestructura, setInfraestructura] = useState(["Sí, con API REST/GraphQL", "Sí, con base de datos", "Sí, pero necesita adaptaciones", "No, requerimos soporte para integrarnos"]);
  const [frecuencia, setFrecuencia] = useState(["Cada pocos minutos (1-10 min)", "Horario (10 min - 1 hora)", "Diario (>1 - 24 horas)", "No solemos actualizar con regularidad"]);
  const [escalabilidad, setEscalabilidad] = useState(["Infraestructura elástica en la nube (AWS, Azure, GCP)", "Servidores dedicados con capacidad definida", "No tenemos una estrategia clara de escalabilidad"]);
  const [soporte, setSoporte] = useState(["Equipo dedicado con soporte 24/7", "Soporte en horario laboral", "Soporte limitado", "No podemos proporcionar soporte"]);
  const [tematicaConsumidor, setTematicaConsumidor] = useState(["Estrés hídrico en cultivos (humedad del suelo, clima, irrigación, etc.)", "Producción y rendimiento de cosechas (históricos de producción, condiciones de cultivo, etc.)", "Presencia y evolución de enfermedades en cultivos (imágenes, reportes fitosanitarios, sensores, etc.)", "Uso de agua subterránea (datos de pozos, caudales extraídos, ubicación de usuarios, etc.)"]);
  const [auditorias, setAuditorias] = useState(["Sí, con registros de acceso y uso automatizados", "Solo en casos específicos", "No realizamos auditoría de datos"]);
  const [acceso, setAcceso] = useState(["Implementamos control de acceso granular por lotes", "Acceso generalizado sin restricciones", "No tenemos un sistema formal de acceso"]);

  
  const onSubmit = async (data) => {
    try {
      await Fetcher.post('/api/uploadForm3', {
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
      <title>Form3</title>

      <main >
        <section>
          <div >
            <Form3
              onSubmit={onSubmit}
              rol={rol}
              setRol={setRol}
              tematicaProveedor={tematicaProveedor}
              setTematicaProveedor={setTematicaProveedor}
              infraestructura={infraestructura}
              setInfraestructura={setInfraestructura}
              frecuencia={frecuencia}
              setFrecuencia={setFrecuencia}
              escalabilidad={escalabilidad}
              setEscalabilidad={setEscalabilidad}
              soporte={soporte}
              setSoporte={setSoporte}
              tematicaConsumidor={tematicaConsumidor}
              setTematicaConsumidor={setTematicaConsumidor}
              auditorias={auditorias}
              setAuditorias={setAuditorias}
              acceso={acceso}
              setAcceso={setAcceso}
            />
          </div>
        </section>
      </main>
    </>
  );
}

Page.auth = true;
