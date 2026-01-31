import { create } from 'zustand';

const MOCK_MEMORIES = [
    { id: 1, type: 'text', content: 'The smell of old books in the library.' },
    { id: 2, type: 'image', content: 'https://picsum.photos/id/10/300/200' }, // Placeholder
    { id: 3, type: 'audio', content: 'Soft rain on the roof.' },
    { id: 4, type: 'text', content: 'A quiet morning coffee.' },
    { id: 5, type: 'image', content: 'https://picsum.photos/id/15/300/200' },
    { id: 6, type: 'text', content: 'Walking barefoot on grass.' },
];

export const useMemories = create((set, get) => ({
    // Active memories currently floating in the sky
    activeMemories: [],
    // All available memories to pull from
    memoryPool: [...MOCK_MEMORIES],

    // Initialize with some random memories if needed, or allow the generator to add them
    addMemory: (memory) => set((state) => ({
        activeMemories: [...state.activeMemories, memory]
    })),

    removeMemory: (id) => set((state) => ({
        activeMemories: state.activeMemories.filter((m) => m.id !== id)
    })),

    // Get a random memory content from the pool
    getRandomMemoryContent: () => {
        const pool = get().memoryPool;
        return pool[Math.floor(Math.random() * pool.length)];
    }
}));
