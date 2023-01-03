import './user.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { USERS_URL } from '../../api/apiURL'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Pagination from '../../components/Pagination'

const Users = () => {
    const axiosPrivate = useAxiosPrivate()
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [nmbrOfPages, setNmbrOfPages] = useState(0)

    useEffect(() => {

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(`${USERS_URL}?page=${page}&search=${search}`)
                const { users, nmbrOfPages } = response.data
                setUsers(users)
                setNmbrOfPages(nmbrOfPages)
                setPage(1)
            } catch (err) {
                console.log(err)
            }
        }
        
        getUsers()

    }, [])

    useEffect(() => {
        const sendQuery = async () => {
            setPage(1)
            try {
                const response = await axiosPrivate.get(`${USERS_URL}?page=${page}&search=${search}`)
                const { users, nmbrOfPages } = response.data
                setUsers(users)
                setNmbrOfPages(nmbrOfPages)
            } catch (err) {
                console.log(err)
            }
        }

        sendQuery()
    }, [search])

    const handlePageBack = async () => {
        try {
          const response = await axiosPrivate.get(`${USERS_URL}?page=${page - 1}&search=${search}`)
          const users = response.data.users
          setUsers(users)
          setPage(prev => prev - 1)
        } catch (err) {
          console.log(err)
        }
      }
      
    const handlePageForward = async () => {
        try {
            const response = await axiosPrivate.get(`${USERS_URL}?page=${page + 1}&search=${search}`)
            const users = response.data
            setUsers(users)
            setPage(prev => prev + 1)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <section className="Users">
        <form className="Users__form" onSubmit={(e) => e.preventDefault()}>
            <input
                className="Users__search"
                type="text"
                htmlFor="Search"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>

        {users?.length ? (
            <>
                <ul className="Users__list">
                    {users.map(user => (
                        <li key={user._id} className="Users__list-item">
                            <FontAwesomeIcon icon={faUser} />
                            <Link to={`/users/${user._id}`}>{user.username}</Link>
                        </li>
                    ))}
                </ul>
                <Pagination 
                    page={page}
                    nmbrOfPages={nmbrOfPages}
                    handlePageBack={handlePageBack}
                    handlePageForward={handlePageForward}
                />
            </>
        ) : (
                <p style={{marginTop: "2rem"}}>
                    No users to display
                </p>
            )
        }
    </section>
  )
}

export default Users