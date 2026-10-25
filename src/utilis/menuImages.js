// Finds every picture in src/assets/images/menu/ automatically.
// To add a photo for a dish: save it in that folder with the same name as the
// dish's "photo" field, e.g. chicken-karahi.jpg  (.jpg .jpeg .png .webp all work).
const files = import.meta.glob('../assets/images/menu/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

// Turn { "../assets/images/menu/kheer.jpg": url }  into  { kheer: url }
const imageByName = {};
for (const [path, url] of Object.entries(files)) {
  const fileName = path.split('/').pop();
  imageByName[fileName.replace(/\.[^.]+$/, '')] = url;
}

// Returns the picture's URL, or null when that dish has no photo yet.
export const getMenuImage = (photoName) => imageByName[photoName] ?? null;
