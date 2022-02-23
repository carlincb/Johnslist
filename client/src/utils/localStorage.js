export const getSavedProductIds = () => {
    const savedProductIds = localStorage.getItem('my_products')
        ? JSON.parse(localStorage.getItem('my_products'))
        : [];

    return savedProductIds;
};

export const removeProductId = (productId) => {
    const savedProductIds = localStorage.getItem('my_products')
        ? JSON.parse(localStorage.getItem('my_products'))
        : null;

    if (!savedProductIds) {
        return false;
    }

    const updatedSavedProductIds = savedProductIds?.filter((savedProductIds) => savedProductIds !== productId);
    localStorage.setItem('saved_products', JSON.stringify(updatedSavedProductIds));

    return true;
};
