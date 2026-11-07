// All menu data lives here. Prices are whole rupees (PKR), stored as numbers.
// "photo" is the file name (without extension) of a picture inside
// src/assets/images/menu/. If no picture exists yet, a placeholder is shown.

export const menuItems = [
  // Biryani & Rice
  { id: 1, name: 'Chicken Biryani', category: 'Biryani & Rice', price: 450, photo: 'chicken-biryani' },
  { id: 2, name: 'Beef Pulao', category: 'Biryani & Rice', price: 420, photo: 'beef-pulao' },

  // BBQ & Tikka
  { id: 3, name: 'Chicken Tikka (leg)', category: 'BBQ & Tikka', price: 380, photo: 'chicken-tikka' },
  { id: 4, name: 'Seekh Kabab (4 pcs)', category: 'BBQ & Tikka', price: 550, photo: 'seekh-kabab' },
  { id: 5, name: 'Malai Boti', category: 'BBQ & Tikka', price: 650, photo: 'malai-boti' },

  // Karahi & Curries
  { id: 6, name: 'Chicken Karahi (half)', category: 'Karahi & Curries', price: 1600, photo: 'chicken-karahi' },
  { id: 7, name: 'Butter Chicken', category: 'Karahi & Curries', price: 1100, photo: 'butter-chicken' },
  { id: 8, name: 'Rogan Josh', category: 'Karahi & Curries', price: 1800, photo: 'rogan-josh' },
  { id: 9, name: 'Daal Mash', category: 'Karahi & Curries', price: 450, photo: 'daal-mash' },

  // Fast Food
  { id: 10, name: 'Zinger Burger', category: 'Fast Food', price: 550, photo: 'zinger-burger' },
  { id: 11, name: 'Chicken Shawarma', category: 'Fast Food', price: 350, photo: 'chicken-shawarma' },

  // Breads
  { id: 12, name: 'Plain Naan', category: 'Breads', price: 50, photo: 'plain-naan' },
  { id: 13, name: 'Garlic Naan', category: 'Breads', price: 120, photo: 'garlic-naan' },

  // Breakfast
  { id: 14, name: 'Chole Bhature', category: 'Breakfast', price: 350, photo: 'chole-bhature' },
  { id: 15, name: 'Aloo Puri', category: 'Breakfast', price: 400, photo: 'aloo-puri' },

  // Desserts
  { id: 16, name: 'Gulab Jamun (2 pcs)', category: 'Desserts', price: 200, photo: 'gulab-jamun' },
  { id: 17, name: 'Kheer', category: 'Desserts', price: 250, photo: 'kheer' },

  // Drinks
  { id: 18, name: 'Sweet Lassi', category: 'Drinks', price: 280, photo: 'sweet-lassi' },
  { id: 19, name: 'Doodh Patti Chai', category: 'Drinks', price: 120, photo: 'doodh-patti-chai' },
  { id: 20, name: 'Mint Margarita', category: 'Drinks', price: 250, photo: 'mint-margarita' },
];

// The tab list is built from the items, so a category name is typed only once
// (no risk of a tab and an item disagreeing because of a typo).
export const menuCategories = ['All', ...new Set(menuItems.map((item) => item.category))];
