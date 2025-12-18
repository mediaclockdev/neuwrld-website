export const findCategoryBySlug = (categories, slug) => {
  return categories.find((cat) => cat.slug === slug) || null;
};
