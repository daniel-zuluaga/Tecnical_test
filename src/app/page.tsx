'use client'
import { getDogBreeds, getFactsBreeds, getGroupBreeds } from "@/api/dogService";
import { DogCard } from "@/components/DogCard";
import { DogBreed } from "@/models/dog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fact } from "@/models/fact";
import { FactCard } from "@/components/FactCard";
import { GroupBreed } from "@/models/groupBreed";

export default function Home() {
    const router = useRouter();
    const [breeds, setBreeds] = useState<DogBreed[]>([]);
    const [groups, setGroups] = useState<GroupBreed[]>([]);
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

        const fetchGroups = async () => {
            try {
                const response = await getGroupBreeds();
                setGroups(response);
            } catch (error) {
                setError('Error al cargar los grupos de razas');
                console.error(error);
            }
        };

        fetchBreeds();
        fetchFacts();
        fetchGroups();
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
                <h1>Datos curiosos sobre las razas de perros</h1>

            </div>
            <div className="overflow-x-auto">
                <div className="flex space-x-4 p-4 min-w-max">
                    {facts.map((fact) => (
                        <FactCard key={fact.id} fact={fact} />
                    ))}
                </div>
            </div>
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
                <h1>Grupos de razas de perros</h1>
                <Link href="/all-groups">Ver todos los grupos</Link>
            </div>
            <div className="grid grid-cols-1 gap-8 p-4">
                {groups.map((group) => (
                    <div key={group.id} className="border rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4 text-center">{group.attributes.name}</h2>
                        <div className="overflow-x-auto">
                            <div className="flex space-x-4 min-w-max">
                                {group.relationships.breeds.data.map((breed) => (
                                    <button
                                        key={breed.id}
                                        onClick={() => {
                                            router.push(`/breed/${breed.id}/detail`);
                                        }}
                                        className="bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors p-4 whitespace-nowrap"
                                    >
                                        Ver detalles de la raza
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
