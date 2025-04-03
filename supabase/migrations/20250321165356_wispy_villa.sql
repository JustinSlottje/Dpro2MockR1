/*
  # Update Trex logo

  Updates the logo URL for Trex company in the database.
*/

UPDATE companies
SET logo = 'https://hilltoplbr.com/wp-content/uploads/2023/09/Trex.png'
WHERE name ILIKE '%trex%';