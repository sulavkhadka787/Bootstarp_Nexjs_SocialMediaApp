const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("middleware hit===========", req.headers.authorization);
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send("Unauthorized===no req headers--authorization");
    }

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.jwtSecret
    );
    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Unauthorized-middleware-auth");
  }
};
