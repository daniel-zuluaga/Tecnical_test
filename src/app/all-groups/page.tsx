'use client'
import { getGroupBreeds } from "@/api/dogService";
import { GroupBreed } from "@/models/groupBreed";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowLeftIcon from "@heroicons/react/16/solid/ArrowLeftIcon";

export default function AllGroupsPage() {
    const router = useRouter();
    const [groups, setGroups] = useState<GroupBreed[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            const groups = await getGroupBreeds();
            setGroups(groups);
            setLoading(false);
        }
        fetchGroups();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex items-center mx-0.5 p-3">
                <Link href="/">
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
                <h1 className="mx-5">All Groups</h1>
            </div>
            <div className="grid grid-cols-1 gap-8 p-4">
                {groups.map((group) => (
                    <div key={group.id}>
                        <h2>{group.attributes.name}</h2>
                        <div className="overflow-x-auto">
                            <div className="flex space-x-4 min-w-max">
                                {group.relationships.breeds.data.map((breed) => (
                                    <button key={breed.id} onClick={() => {
                                        router.push(`/breed/${breed.id}/detail`);
                                    }} className="bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors p-4 whitespace-nowrap">
                                        Ver detalles de la raza
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}