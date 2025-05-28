export interface GroupBreed {
    id: string;
    type: string;
    attributes: {
        name: string;
    };
    relationships: {
        breeds: {
            data: {
                id: string;
                type: string;
            }[];
        };
    };
}