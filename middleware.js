async function cacheData(req, res, next) {
    try {
      const characterId = req.params.id;
      let redisKey = "hogwarts-characters";
      if (characterId) {
        redisKey = `hogwarts-character-${req.params.id}`;
      }
      const cacheResults = await redisClient.get(redisKey);
      if (cacheResults) {
        res.send({
          fromCache: true,
          data: JSON.parse(cacheResults),
        });
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(404);
    }
}

module.exports = { cacheData };