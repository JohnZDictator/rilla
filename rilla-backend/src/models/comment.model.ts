import {z} from 'zod'

export interface Comment {
    commentId: string
    transcriptId: string
    content: string
    author: string
    attachmentUrl?: string
    createdAt: string
    updatedAt?: string
}

export const CommentSchema = z.object({
    commentId: z.string(),
    transcriptId: z.string(),
    content: z.string(),
    author: z.string(),
    attachmentUrl: z.string().optional(),
    createdAt: z.string(),
    updateAt: z.string().optional()
})
