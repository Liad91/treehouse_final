const url = require('url');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config').jwtSecret;
const User = require('../models/user');

function findOrCreate(req, res, next) {
  const profile = req.user;

  if (!profile) {
    const err = new Error('Profile not found');

    err.status = 404;
    err.type = 'not-found';

    res.redirect(url.format({
      pathname: 'http://localhost:4200/callback',
      query: { err: 'failure' }
    }));
    return next(err);
  }

  if (!profile.username || !profile.email || !profile.password || !profile.avatarUrl) {
    const err = new Error('Profile fileds missing');

    err.status = 403;
    err.type = 'required'
    return next(err);
  }

  User.findOrCreate(profile)
    .then(user => {
      const query = {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        background: user.background,
        favorites: user.favorites,
        token: buildToken(user._id)
      };
      
      res.redirect(url.format({
        pathname: 'http://localhost:4200/callback',
        query: query
      }));
    })
    .catch(err => next(err));
}

function buildToken(userId) {
  return `JWT ${jwt.sign({ userId }, jwtSecret, { expiresIn: '2h' })}`;
}

module.exports = { findOrCreate };