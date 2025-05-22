import { Fact } from '@/models/fact';
import { DogBreedsResponse } from '../models/dog';

const API_URL = 'https://dogapi.dog/api/v2';

export const getDogBreeds = async (page: number = 1): Promise<DogBreedsResponse> => {
  try {
    const response = await fetch(`${API_URL}/breeds?page[number]=${page}`);
    if (!response.ok) {
      throw new Error('Error fetching dog breeds');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getDogBreeds:', error);
    throw error;
  }
};

export const getFactsBreeds = async (limits: number = 5000): Promise<Fact[]> => {
  try {
    const response = await fetch(`${API_URL}/facts?limit=${limits}`);
    if (!response.ok) {
      throw new Error('Error fetching dog facts');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error in getFactsBreeds:', error);
    throw error;
  }
};