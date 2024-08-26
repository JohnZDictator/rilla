import { Request, Response } from 'express';
import * as commentService from '../services/comment.service';

// Get a single comment by ID
export const getCommentController = async (req: Request, res: Response) => {
    const response = await commentService.getComment(req as any);
    res.status(response.statusCode).json(JSON.parse(response.body));
};

// Create a new comment
export const createCommentController = async (req: Request, res: Response) => {
    const response = await commentService.createComment(req as any);
    res.status(response.statusCode).json(JSON.parse(response.body));
};

// Update an existing comment
export const updateCommentController = async (req: Request, res: Response) => {
    const response = await commentService.updateComment(req as any);
    res.status(response.statusCode).json(JSON.parse(response.body));
};

// Delete a comment by ID
export const deleteCommentController = async (req: Request, res: Response) => {
    const response = await commentService.deleteComment(req as any);
    res.status(response.statusCode).json(JSON.parse(response.body));
};

// Get all comments
export const getAllCommentsController = async (req: Request, res: Response) => {
    const response = await commentService.getAllComments(req as any);
    res.status(response.statusCode).json(JSON.parse(response.body));
};
