import './cocktail.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { COMMENTS_URL } from '../../api/apiURL'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import Comment from './Comment'

const CommentSection = ({ cocktail }) => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const { id } = useParams()

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await axiosPrivate.get(`${COMMENTS_URL}?cocktailId=${id}`)
                const comments = response.data
                setComments(comments)
            } catch (err) {
                console.log(err)
            }
        }

        getComments()

    }, [])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        const data = { body: newComment, cocktailId: cocktail._id, userId: auth.userId }

        try {
            const response = await axiosPrivate.post(COMMENTS_URL, data)
            const allComments = [...comments, response.data]
            setComments(allComments)
            setNewComment('')
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <section className="CommentSection">
        <form className="CommentSection__form" onSubmit={handleCommentSubmit}>
            <textarea
                className="CommentSection__comment-input"
                id="newComment"
                placeholder="New comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
            >
            </textarea>
            <button className="icon-btn CommentSection__comment-btn" title="Post comment">
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </form>

        {comments?.length ? (
            comments.map(comment => (
                <Comment 
                    key={comment._id} 
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                />
            ))
        ) : (
            <p>Write a comment!</p>
        )}
    </section>
  )
}

export default CommentSection