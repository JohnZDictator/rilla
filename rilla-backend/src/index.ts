import express, {Request, Response, NextFunction} from "express"
import commentRoutes from "./routes/comment.route"

const app = express()
app.use(express.json())

app.use('/api/comments', commentRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: err.message})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})