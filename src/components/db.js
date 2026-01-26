import Dexie from 'dexie';

export const db = new Dexie('likes');
db.version(1).stores({
  likes: '++id, &stihId' 
});
// Add selectedVibes store for persisting chosen tags on VibesPage
db.version(2).stores({
  likes: '++id, &stihId',
  selectedVibes: '++id, &vibeId'
});