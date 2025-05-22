'use client'
import { DogBreed } from "../models/dog";

interface DogCardProps {
    breed: DogBreed;
    handleDetailsClick: (id: string) => void;
}

export const DogCard = ({ breed, handleDetailsClick }: DogCardProps) => {
    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col w-80">
            <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{breed.attributes.name}</h2>
                <p className="text-gray-600">{breed.attributes.description}</p>
            </div>
            <div className="mt-4">
                <button
                    onClick={() => handleDetailsClick(breed.id)}
                    className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                    Ver Detalles
                </button>
            </div>
        </div>
    );
};