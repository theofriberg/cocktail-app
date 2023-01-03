import './cocktail.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faUser, faPenToSquare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { COMMENTS_URL, USERS_URL } from '../../api/apiURL'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const Comment = ({ comment, comments, setComments }) => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [edit, setEdit] = useState('')

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get(`${USERS_URL}/${comment.user}`)
                const user = response.data
                setUser(user)
            } catch (err) {
                console.log(err)
            }
        }

        getUser()
    }, [])

    const handleCommentDelete = async (id) => {
        try {
            await axiosPrivate.delete(COMMENTS_URL, {
                data: {
                    id: id,
                    userId: auth.userId,
                    roles: auth.roles
                }
            })
            const commentsList = comments.filter(c => c._id !== id)
            setComments(commentsList)
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditSubmit = async () => {
        const data = { id: comment._id, body: edit }

        try {
            const response = await axiosPrivate.patch(COMMENTS_URL, data)
            comment.body = response.data.body
            setEdit('')
        } catch (err) {
            console.log(err)
        }
    }


  return (
    <section className="Comment">
        <article className="Comment__container">
            <button 
                className="icon-btn Comment__user-icon-btn" 
                onClick={() => navigate(`/users/${comment.user}`)}
            >
                <FontAwesomeIcon icon={faUser} />
            </button>
            <div className="Comment__text-container">
                <span className="Comment__username">{user.username}</span>
                <span className="Comment__body">{comment.body}</span>
            </div>

            <div className="Comment__btn-container">
                <button
                    className="icon-btn Comment__edit-btn"
                    title="Edit Comment"
                    onClick={() => setIsEditing(prev => !prev)}
                    visible={auth.userId === comment.user}
                    enabled={auth.userId === comment.user.toString()}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button 
                    className="icon-btn Comment__delete-btn"
                    title="Delete Comment"
                    onClick={() => handleCommentDelete(comment._id)}
                    visible={auth.userId === comment.user}
                    enabled={auth.userId === comment.user.toString()}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </article>

            {isEditing &&
                <form className="CommentSection__form" onSubmit={handleEditSubmit}>
                    <textarea
                        className="CommentSection__comment-input"
                        id="editComment"
                        placeholder="Edit comment"
                        value={edit}
                        onChange={(e) => setEdit(e.target.value)}
                        required
                    >
                    </textarea>
                    <button className="icon-btn CommentSection__comment-btn" title="Post comment">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </form>
            }

    </section>
  )
}

export default Comment