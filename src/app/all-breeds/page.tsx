import { DogBreeds } from "@/components/DogBreeds";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function AllBreeds() {
    return (
        <main>
            <div className="flex justify-between items-center p-2">
                <Link href="/">
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
            </div>
            <DogBreeds />
        </main>
    )
}