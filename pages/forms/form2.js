import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Form2 from '../components/Form2';
import toast, { Toaster } from 'react-hot-toast';
import { Fetcher } from '@/lib/fetcher';

export default function Page() {
  //const { data: session } = useSession();
  const [cultivo, setCultivo] = useState(["Aguacate","Ajo","Algodón","Almendro","Arándano","Arroz","Avena","Calabacín","Cebada","Cebolla", "Chirimoya","Ciruelo","Espárrago","Frambuesa","Fresa","Garbanzo","Girasol","Guisante","Haba","Lechuga","Limón","Mandarina","Mango","Melocotón","Naranjo dulce","Nectarina","Olivo","Patata","Pimiento","Remolacha","Sandía","Tomate","Trigo","Triticale","Veza","Vid","Zanahoria"]);
  const [porcentaje, setPorcentaje] = useState(["Entre 0% y 10%","Entre 10% y 20%","Entre 20% y 30%","Entre 30% y 40%","Entre 40% y 50%","Entre 50% y 60%","Entre 60% y 70%","Entre 70% y 80%","Entre 80% y 90%", "Entre 90% y 100%"]);
  const [facturacion, setFacturacion] = useState([  "<= 5% según CNAE","Entre 5% y 50% según CNAE",">= 50% según CNAE"]);

  const onSubmit = async (data) => {
    console.log("gegfwjygf")
    try {
      await Fetcher.post('/api/uploadForm2', {
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
        <title>Form2</title>

      <main >
        <section>
          <div >
            <Form2
              onSubmit={onSubmit}
              cultivo={cultivo} 
              setCultivo={setCultivo} 
              facturacion={facturacion} 
              setFacturacion={setFacturacion} 
              porcentaje={porcentaje} 
              setPorcentaje={setPorcentaje}
            />
          </div>
        </section>
      </main>
    </>
  );
}

Page.auth = true;
