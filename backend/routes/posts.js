const express = require('express');
const {Post, Image, User, Comment} = require('../models')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            // where : { id:lastId},
            limit: 10,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname']
                }, {
                    model: Image
                }, {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname']
                        }
                    ]
                }
            ]

        });

        res
            .status(200)
            .json(posts);
    } catch (err) {
        console.error(err);
        next(err)
    }
})

module.exports = router;
