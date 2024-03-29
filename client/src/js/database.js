import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Adding to the database...');

  const jateDb = await openDB('jate', 1);
  const transactionVar = jateDb.transaction('jate', 'readwrite');
  const storedObject = transactionVar.objectStore('jate');


  const request = storedObject.put({ id: 1, value: content });
  const result = await request;

  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting data from the database...');

  const jateDb = await openDB('jate', 1);
  const transactionVar = jateDb.transaction('jate', 'readonly');
  const storedObject = transactionVar.objectStore('jate');
  const request = storedObject.get(1);
  const result = await request;

  console.log('Data from database:', result);
  if (result !== undefined) {
    return result.value;
  } else {
    return;
  }
};


initdb();
