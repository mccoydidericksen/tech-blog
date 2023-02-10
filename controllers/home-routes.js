const router = require('express').Router();
const { Post, User, Comment } = require('../models/index');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });
        const dbCommentData = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const comments = dbCommentData.map((comment) => comment.get({ plain: true }));
        const post = dbPostData.get({ plain: true });
        res.render('post', {
            post,
            comments,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/update/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
            ],
        });
        if(!dbPostData){
            res.redirect('/dashboard');
            return
        }
        const post = dbPostData.get({ plain: true });
        if(post.user.id === req.session.user_id) {
            res.render('update', {
                post,
                logged_in: req.session.logged_in,
            });
        } else {
            res.redirect('/dashboard');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const dbUser = await User.findByPk(req.session.user_id);
        const user = dbUser.get({ plain: true });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            user,
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;
