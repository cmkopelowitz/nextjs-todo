const localStorageHelper = {
  getItem(key: string) {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return null;
    }
  },

  setItem(key: string, data: any) {
    try {
      const dataToStore = JSON.stringify(data);
      localStorage.setItem(key, dataToStore);
    } catch (error) {
      console.error("Error stringifying data for localStorage:", error);
    }
  },

  updateItem(key: string, data: Object) {
    try {
      const dataToStore = JSON.stringify(data);
      localStorage.setItem(key, {
        ...JSON.parse(localStorage.getItem(key) || ""),
        dataToStore,
      });
    } catch (error) {
      console.error("Error stringifying data for localStorage:", error);
    }
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export default localStorageHelper;

// Example usage:
// const exampleData = { key: "value" };

// // Set data in localStorage
// localStorageHelper.setItem("exampleKey", exampleData);

// // Get data from localStorage
// const retrievedData = localStorageHelper.getItem("exampleKey");
// console.log("Retrieved Data:", retrievedData);

// // Remove item from localStorage
// localStorageHelper.removeItem("exampleKey");

// Clear all data from localStorage
// localStorageHelper.clear();
