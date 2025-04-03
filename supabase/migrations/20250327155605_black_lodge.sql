/*
  # Update Johnstone Supply logo

  Updates the logo URL for Johnstone Supply to use their official SVG logo.
*/

UPDATE companies
SET logo = 'https://www.johnstonesupply.com/binaries/content/gallery/johnstonesupplycms/logos/johnstone-supply-logo.svg'
WHERE name ILIKE '%johnstone%';