// triviaAPI.js

const BASE_URL = 'https://opentdb.com';

// Function to fetch questions based on category, difficulty, and amount
export const fetchQuizQuestions = async (categoryId, difficulty, amount) => {
  try {
    const url = `${BASE_URL}/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('No questions available for the selected options.');
    }

    // Return the array of questions from the API response
    return data.results;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error; // Rethrow error to be handled in the component
  }
};

// Function to fetch categories
export const fetchCategories = async () => {
  try {
    const url = `${BASE_URL}/api_category.php`;
    const response = await fetch(url);
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error('Error fetching quiz categories:', error);
    throw error;
  }
};
