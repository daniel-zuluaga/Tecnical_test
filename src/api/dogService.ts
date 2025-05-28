import { Fact } from '@/models/fact';
import { DogBreed, DogBreedsResponse } from '../models/dog';
import { GroupBreed } from '@/models/groupBreed';

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
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error in getFactsBreeds:', error);
    throw error;
  }
};

export const getGroupBreeds = async (): Promise<GroupBreed[]> => {
  try {
    const response = await fetch(`${API_URL}/groups`);
    if (!response.ok) {
      throw new Error('Error fetching dog groups');
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error in getGroupBreeds:', error);
    throw error;
  }
};

export const getBreedsByGroup = async (groupId: string): Promise<DogBreed[]> => {
  try {
    const response = await fetch(`${API_URL}/groups/${groupId}`);
    if (!response.ok) {
      throw new Error('Error fetching dog breeds by group');
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error in getBreedsByGroup:', error);
    throw error;
  }
};

export const getBreedById = async (breedId: string): Promise<DogBreed> => {
  try {
    const response = await fetch(`${API_URL}/breeds/${breedId}`);
    if (!response.ok) {
      throw new Error('Error fetching dog breed by id');
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error in getBreedById:', error);
    throw error;
  }
};