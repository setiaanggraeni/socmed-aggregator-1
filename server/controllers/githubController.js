const request = require('request')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

class GithubController {
    static userRepoList(req, res){
        let token = req.headers.token
        if(token){
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                User.find({_id: decoded.id})
                .then(user => {
                    if(user){
                        var options = {
                            url: 'https://api.github.com/user/repos',
                            headers: {
                              'User-Agent': 'request',
                              'Accept': 'application/vnd.github.nightshade-preview+json',
                              'Authorization': `token ${process.env.access_token}`
                            }
                        }
                
                        function callback(error, response, body) {
                            if (!error && response.statusCode == 200) {
                              var info = JSON.parse(body)
                              res.status(200).json(info)
                            } else {
                                res.status(500).json(error)
                            }
                        }
                        request(options, callback);
                    } else {
                        res.status(400).json('User not found!')
                    }
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            })
        } else {
            res.status(400).json('You have no access')
        }
        
    }

    static createRepo(req, res){
        let token = req.headers.token
        if(token){
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                User.find({_id: decoded.id})
                .then(user => {
                    if(user){
                        request.post({
                            url: 'https://api.github.com/user/repos',
                            headers: {
                                'User-Agent': 'request',
                                'content-type': 'application/json',
                                'Authorization': `token ${process.env.access_token}`,
                                token: token
                            },
                            json: {
                                'name': req.body.name
                            }
                        }
                        , function (err, response, body) {
                            if(err) res.status(500).json(err)
                            res.status(200).json(body)
                        })
                    } else {
                        res.status(400).json('User not found!')
                    }
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            })
        } else {
            res.status(400).json('You have no access')
        }
    }

    static searchRepo(req, res){
        let token = req.headers.token
        if(token){
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                User.find({_id: decoded.id})
                .then(user => {
                    if(user){
                        var options = {
                            url: `https://api.github.com/search/repositories?q=${req.query.q}`,
                            headers: {
                              'User-Agent': 'request',
                              'Accept': 'application/vnd.github.nightshade-preview+json',
                              'Authorization': `token ${process.env.access_token}`,
                            }
                        }
                
                        function callback(error, response, body) {
                            if (!error && response.statusCode == 200) {
                              var info = JSON.parse(body);
                              res.status(200).json(info)
                            } else{
                                res.status(500).json(error)
                            }
                        }
                        request(options, callback);
                    } else {
                        res.status(400).json('User not found!')
                    }
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            })
        }
    }
}

module.exports = GithubController