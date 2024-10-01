export const getTickets = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return { tickets: [] }; // Return an empty array in case of error
    }
  };
