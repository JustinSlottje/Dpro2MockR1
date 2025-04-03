/*
  # Update Graybar logo

  Updates the logo URL for Graybar company in the database.
*/

UPDATE companies
SET logo = 'https://www.panelbuilderus.com/wp-content/uploads/2022/08/Graybar_Logo.png'
WHERE name ILIKE '%graybar%';