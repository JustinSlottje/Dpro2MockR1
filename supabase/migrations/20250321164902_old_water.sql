/*
  # Update Johnstone Supply logo

  Updates the logo URL for Johnstone Supply in the companies table.
*/

UPDATE companies
SET logo = 'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/436257624_988673289924964_1277055090350883146_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=usyzxUXHBaMQ7kNvgEDE956&_nc_oc=Adk9yiFJV6BZUNE7pGS88EpZpKgN6mAphLjSJS4kgEwRISoWk3LxjdOFSFtyWPj2CC1FzVx6EcVQmIJuob3oJDB7&_nc_zt=23&_nc_ht=scontent-lga3-2.xx&_nc_gid=g2-FGUTIZJpVOMHQhvBQng&oh=00_AYFaVxl7OxQPaE05s0i79Qutx28xWGepKv1_u_rio_tXEQ&oe=67E37E3B'
WHERE name ILIKE '%johnstone%';