/*
  # Update Carrier logo

  Updates the logo URL for Carrier company in the database.
*/

UPDATE companies
SET logo = 'https://resource.carrierenterprise.com/is/image/Watscocom/ce_global_brands_carrier_1000x500?defaultImage=ce_image-coming-soon&fit=constrain,1&fmt=png8&hei=150&wid=300'
WHERE name ILIKE '%carrier%';