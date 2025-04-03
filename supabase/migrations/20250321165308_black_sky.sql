/*
  # Update Milwaukee logo

  Updates the logo URL for Milwaukee company in the database.
*/

UPDATE companies
SET logo = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Milwaukee_Logo.svg'
WHERE name ILIKE '%milwaukee%';