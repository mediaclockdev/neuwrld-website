export const findCategoryPath = (categories, slug, path = []) => {
  for (const category of categories) {
    const newPath = [...path, category];

    if (category.slug === slug) {
      return newPath;
    }

    if (category.children?.length) {
      const found = findCategoryPath(category.children, slug, newPath);
      if (found) return found;
    }
  }
  return null;
};
