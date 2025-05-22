'use client'
import { useEffect, useState } from 'react';
import { getDogBreeds } from '../api/dogService';
import { DogBreed } from '../models/dog';
import { useRouter } from 'next/navigation';
import { DogCard } from './DogCard';

export const DogBreeds = () => {
  const router = useRouter();
  const [breeds, setBreeds] = useState<DogBreed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const response = await getDogBreeds(currentPage);
        setBreeds(response.data);
        setTotalPages(response.meta.pagination.last);
        setError(null);
      } catch (err) {
        setError('Error al cargar las razas de perros');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      // Si hay 3 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Si la página actual es 1 o 2
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
      }
      // Si la página actual es la última o penúltima
      else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      }
      // Para páginas en el medio
      else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  const handleDetailsClick = (id: string) => {
    router.push(`/breed/${id}/detail`);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto">
        <footer className="flex justify-between items-center bg-gray-900 p-4">
            <h1 className="text-2xl font-bold mb-4">Razas de Perros</h1>
        </footer>
        <div className='p-4'></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {breeds.map((breed) => (
                <DogCard key={breed.id} breed={breed} handleDetailsClick={handleDetailsClick} />
            ))}
        </div>
        <div className="mt-8 flex justify-center items-center gap-2">
            <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white disabled:bg-gray-300"
            >
            ←
            </button>
            <div className="flex items-center gap-2">
            {getPageNumbers().map((pageNum) => (
                <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentPage === pageNum
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
                >
                {pageNum}
                </button>
            ))}
            </div>
            <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white disabled:bg-gray-300"
            >
            →
            </button>
        </div>
        </div>
  );
}; 