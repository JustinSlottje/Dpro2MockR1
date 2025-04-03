/*
  # Update Johnstone Supply logo

  Updates the logo URL for Johnstone Supply in the companies table.
*/

UPDATE companies
SET logo = 'https://scontent.fatl1-1.fna.fbcdn.net/v/t39.30808-6/305327716_488074789992598_8757033718011111809_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=I9ZWz9W9CZYAX9ZRTZ4&_nc_ht=scontent.fatl1-1.fna&oh=00_AfCLELBXjFEwVNyQZLGLEQHYPFDxGLBJVh-Hs4Hs0Hs0Hs&oe=65F0F0F0'
WHERE name ILIKE '%johnstone%';