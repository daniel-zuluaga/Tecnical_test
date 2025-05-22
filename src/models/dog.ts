export interface DogBreed {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    life: {
      max: number;
      min: number;
    };
    male_weight: {
      max: number;
      min: number;
    };
    female_weight: {
      max: number;
      min: number;
    };
    hypoallergenic: boolean;
  };
  relationships: {
    group: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface DogBreedsResponse {
  data: DogBreed[];
  meta: {
    pagination: {
      current: number;
      next: number;
      last: number;
      records: number;
    };
  };
  links: {
    self: string;
    current: string;
    next: string;
    last: string;
  };
} 