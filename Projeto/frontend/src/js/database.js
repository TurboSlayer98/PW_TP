const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

async function getColumnNames(tableName) {
  const result = await prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = ${tableName};
  `;
  return result.map(row => row.column_name);
}

app.get('/', async (req, res) => {
  const tableName = 'Users'; // Change this to your table name
  const columns = await getColumnNames(tableName);
  res.send(`
    <html>
      <head>
        <title>Column Names</title>
      </head>
      <body>
        <h1>Column Names for Table: ${tableName}</h1>
        <table border="1">
          <thead>
            <tr>
              <th>Column Name</th>
            </tr>
          </thead>
          <tbody>
            ${columns.map(column => `<tr><td>${column}</td></tr>`).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
