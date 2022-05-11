import { checkSchema, validationResult } from 'express-validator'
import createError from 'http-errors'

const blogPostSchema = {
  category: {
    in: ['body'],
    isString: {
      errorMessage: 'Category is a mandatory field'
    }
  },
  title: {
    in: ['body'],
    isString: {
      errorMessage: 'title is a mandatory field'
    }
  },
  cover: {
    in: ['body'],
    isString: {
      errorMessage: 'cover is mandatory'
    }
  },
  value: {
    in: ['body.readTime'],
    isString: {
      errorMessage: 'must enter a unit of time'
    }
  },
  unit: {
    in: ['body'],
    isInteger: {
      errorMessage: 'must enter a number'
    }
  },
  author: {
    name: {
      in: ['body'],
      isString: {
        errorMessage: 'must enter a name'
      }
    },
    avatar: {
      in: ['body'],
      isString: {
        errorMessage: 'enter your avatar here'
      }
    }
  },
  content: {
    in: ['body'],
    isString: {
      errorMessage: 'enter the content of your blog post here'
    }
  }
}
export const checkBlogPostsSchema = checkSchema(blogPostSchema)

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    next(createError(400, 'validation errors!', { errorsList: errors.array() }))
  } else {
    next()
  }
}
