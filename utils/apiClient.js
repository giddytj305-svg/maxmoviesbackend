const axios = require('axios');

class MovieAPIClient {
  constructor() {
    this.baseURL = 'https://movieapi.giftedtech.co.ke/api/v2';
    this.apiKey = 'gifted_movieapi_378ry3dq7qdlqdgdqg8ordqg78qd0';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error.message);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      return {
        status: error.response.status,
        message: error.response.data?.message || 'API request failed',
        data: error.response.data
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        status: 503,
        message: 'No response from movie API'
      };
    } else {
      // Something happened in setting up the request
      return {
        status: 500,
        message: 'Error setting up request'
      };
    }
  }
}

module.exports = new MovieAPIClient();
