import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import uniqid from 'uniqid'

const authorsRouter = express.Router()

// const currentFileURL = import.meta.url
// console.log('current file url: ', currentFileURL)

// const currentFilePath = fileURLToPath(currentFileURL)
// console.log('current file path: ', currentFilePath)

// const parentFolderPath = dirname(currentFilePath)
// console.log('parent folder path: ', parentFolderPath)

// const authorsJSONPath = join(parentFolderPath, 'authors.json')
// console.log(authorsJSONPath)

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  'authors.json'
)

authorsRouter.get('/', (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONPath)
  console.log('Content: ', fileContent)

  const authorsArray = JSON.parse(fileContent)
  console.log('content as a json ', authorsArray)

  res.send(authorsArray)
})

authorsRouter.post('/', (req, res) => {
  console.log('req body: ', req.body)

  const newAuthor = {
    ...req.body,
    id: uniqid(),
    avatar:
      'https://ui-avatars.com/api/name=' +
      req.body.name +
      ' ' +
      req.body.surname
  }

  console.log('new author: ', newAuthor)

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  authors.push(newAuthor)

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  res.status(201).send({ id: newAuthor.id })
})

authorsRouter.get('/:userId', (req, res) => {
  const userID = req.params.userId
  console.log('User Id: ', userID)

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  const foundAuthor = authors.find((author) => author.id === userID)

  res.send(foundAuthor)
})

authorsRouter.put('/:userId', (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  const index = authors.findIndex((author) => author.id === req.params.userId)
  const authorToBeModified = authors[index]

  const updatedAuthor = {
    ...authorToBeModified,
    ...req.body,
    updatedAt: new Date()
  }
  authors[index] = updatedAuthor

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  res.send(updatedAuthor)
})

authorsRouter.delete('/:Id', (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  const remainingAuthors = authors.filter(
    (author) => author.id !== req.params.Id
  )
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))

  res.status(204).send()
})

export default authorsRouter
