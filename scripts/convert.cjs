const mysql = require('mysql2/promise');
const uuid = require('uuid');

const config = {
  host: 'localhost',
  user: process.env.DBUSER || 'root',
  password: process.env.DBPASS || 'root',
  port: 3306,
};
(async () => {
  const reader = await mysql.createConnection(config);
  const writer = await mysql.createConnection(config);

  const [rows] = await reader.execute('SELECT * FROM megrulad.alio');
  for (const row of rows) {
    const value = row._key;
    const source = 'alio';
    const [result] = await writer.execute(`
        INSERT INTO translations.Dictionary
        (uuid, value, description, language, source, status)
        VALUES ("${uuid.v4()}", "${value.trim()}", "", "me", "${source}", "ACTIVE")`);

    await writer.execute(`
        INSERT INTO translations.Translations
        (uuid, value, description, language, source, status, dictionaryId)
        VALUES ("${uuid.v4()}", "", "${row.value.trim()}", "ka", "${source}", "ACTIVE", "${result.insertId}")`);
  }

  await reader.end();
  await writer.end();
  process.exit(0);
})();
