import Dexie from 'dexie';

export const db = new Dexie('likes');
db.version(1).stores({
  likes: '++id, &stihId' 
});
