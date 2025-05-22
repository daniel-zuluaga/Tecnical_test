'use client'
import { getDogBreeds, getFactsBreeds } from "@/api/dogService";
import { DogCard } from "@/components/DogCard";
import { DogBreed } from "@/models/dog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fact } from "@/models/fact";
import { FactCard } from "@/components/FactCard";

export default function Home() {
    const router = useRouter();
    const [breeds, setBreeds] = useState<DogBreed[]>([]);
    const [loading, setLoading] = useState(true);
    const [facts, setFacts] = useState<Fact[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                setLoading(true);
                const response = await getDogBreeds(1);
                setBreeds(response.data.slice(0, 5));
                setError(null);
            } catch (err) {
                setError('Error al cargar las razas de perros');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchFacts = async () => {
            try {
                const randomLimit = Math.floor(Math.random() * 50000) + 1;
                const response = await getFactsBreeds(randomLimit);
                setFacts(response);
            } catch (error) {
                setError('Error al cargar los datos curiosos');
                console.error(error);
            }
        };

        fetchBreeds();
        fetchFacts();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main>
            <div className="flex justify-between items-center p-4">
                <h1>Razas de perros</h1>
                <Link href="/all-breeds">Ver todas las razas</Link>
            </div>
            <div className="overflow-x-auto">
                <div className="flex space-x-4 p-4 min-w-max">
                    {breeds.map((breed) => (
                        <DogCard key={breed.id} breed={breed} handleDetailsClick={() => {
                            router.push(`/breed/${breed.id}/detail`);
                        }} />
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center p-4">
                <h1>Datos curiosos sobre las razas de perros</h1>

            </div>
            <div className="overflow-x-auto">
                <div className="flex space-x-4 p-4 min-w-max">
                    {facts.map((fact) => (
                        <FactCard key={fact.id} fact={fact} />
                    ))}
                </div>
            </div>
        </main>
    );
}
