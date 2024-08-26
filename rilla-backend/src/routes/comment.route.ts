import {Router} from 'express'
import { createCommentController, deleteCommentController, getAllCommentsController, getCommentController, updateCommentController } from '../controllers/comment.controller'

const router = Router()

router.post('/', createCommentController)
router.get('/', getAllCommentsController)
router.get('/:commentId', getCommentController)
router.put('/:commentId', updateCommentController)
router.delete('/:commentId', deleteCommentController)

export default router