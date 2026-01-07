module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 405,
      success: false,
      message: 'Method not allowed. Use GET.'
    });
  }

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'Movie API Proxy is working!',
    endpoints: {
      homepage: '/api/v2/homepage',
      trending: '/api/v2/trending',
      search: '/api/v2/search/{query}?page=1',
      info: '/api/v2/info/{id}',
      sources: '/api/v2/sources/{id}?season=1&episode=1'
    },
    creator: 'GiftedTech'
  });
};
