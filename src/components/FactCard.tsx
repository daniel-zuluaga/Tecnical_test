'use client'

import { Fact } from "@/models/fact";

interface FactCardProps {
    fact: Fact;
}

export const FactCard = ({ fact }: FactCardProps) => {
    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col w-80">
            <h2 className="text-xl font-semibold mb-2">{fact.attributes.body}</h2>
        </div>
    );
};