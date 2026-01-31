import { create } from 'zustand';

export const useWeather = create((set) => ({
    weather: 'sunny', // 'sunny' | 'cloudy' | 'rainy'
    setWeather: (newWeather) => set({ weather: newWeather }),
}));
