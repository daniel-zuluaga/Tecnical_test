'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DogBreed } from '@/models/dog';
import { use } from 'react';
import { getBreedById } from '@/api/dogService';

export default function BreedDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [breed, setBreed] = useState<DogBreed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchBreedDetails = async () => {
      try {
        setLoading(true);
        const response = await getBreedById(id);
        setBreed(response);
      } catch (err) {
        setError('Error al cargar los detalles de la raza');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreedDetails();
  }, [id]);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!breed) return <div className="p-4">No se encontró la raza</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 rounded-lg hover:bg-gray-900"
      >
        ← Volver
      </button>
      <div className="rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{breed.attributes.name}</h1>
        <p className="text-gray-600 mb-6">{breed.attributes.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Esperanza de Vida</h2>
            <p>{breed.attributes.life.min} - {breed.attributes.life.max} años</p>
          </div>
          <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Peso</h2>
            <p>Macho: {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg</p>
            <p>Hembra: {breed.attributes.female_weight.min} - {breed.attributes.female_weight.max} kg</p>
          </div>
          <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Características</h2>
            <p>Hipoalergénico: {breed.attributes.hypoallergenic ? 'Sí' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 