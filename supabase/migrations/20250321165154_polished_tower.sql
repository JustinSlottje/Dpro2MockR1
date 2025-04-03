/*
  # Update Ferguson logo

  Updates the logo URL for Ferguson company in the database.
*/

UPDATE companies
SET logo = 'https://www.achrnews.com/ext/resources/2023/08/07/Ferguson-logo.png?1692201910'
WHERE name ILIKE '%ferguson%';