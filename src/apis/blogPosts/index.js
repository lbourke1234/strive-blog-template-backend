import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import uniqid from 'uniqid'
import createError from 'http-errors'
import { checkBlogPostsSchema, checkValidationResult } from './validation.js'

const blogPostsRouter = express.Router()

const blogPostsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  'blogPosts.json'
)
const getBlogPosts = () => JSON.parse(fs.readFileSync(blogPostsJSONPath))
const writeBlogPost = (newBlogPost) =>
  fs.writeFileSync(blogPostsJSONPath, JSON.stringify(newBlogPost))

blogPostsRouter.post(
  '/',
  checkBlogPostsSchema,
  checkValidationResult,
  (req, res, next) => {
    try {
      const blogPosts = getBlogPosts()

      const newBlogPost = { ...req.body, createdAt: new Date(), id: uniqid() }

      blogPosts.push(newBlogPost)

      writeBlogPost(blogPosts)

      res.send(newBlogPost)
    } catch (error) {
      next(error)
    }
  }
)

blogPostsRouter.get('/', (req, res, next) => {
  try {
    const blogPosts = getBlogPosts()

    res.send(blogPosts)
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.get('/:postId', (req, res, next) => {
  try {
    const blogPosts = getBlogPosts()

    const foundBlogPost = blogPosts.find(
      (blog) => blog.id === req.params.postId
    )
    if (foundBlogPost) {
      res.send(foundBlogPost)
    } else {
      next(createError(404, `book with id: ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.put(
  '/:postId',
  checkBlogPostsSchema,
  checkValidationResult,
  (req, res, next) => {
    try {
      const blogPosts = getBlogPosts()

      const index = blogPosts.findIndex((post) => post.id === req.params.postId)

      if (index !== -1) {
        const oldPost = blogPosts[index]

        const newPost = { ...oldPost, ...req.body, updatedAt: new Date() }

        blogPosts[index] = newPost

        writeBlogPost(blogPosts)

        res.send(newPost)
      } else {
        next(createError(404, `Id: ${req.params.postId} not found`))
      }
    } catch (error) {
      next(error)
    }
  }
)

blogPostsRouter.delete('/:postId', (req, res, next) => {
  try {
    const blogPosts = getBlogPosts()

    const postsToKeep = blogPosts.filter((post) => post.id !== req.postId)

    writeBlogPost(postsToKeep)

    res.status(204).send('successfully deleted')
  } catch (error) {
    next(error)
  }
})

export default blogPostsRouter
