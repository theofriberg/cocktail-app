import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"


const Pagination = ({ page, nmbrOfPages, handlePageBack, handlePageForward }) => {
  return  (
    nmbrOfPages > 1 ? (
        <div className="Pagination__btn-container">
        <button
            className="icon-btn Pagination__btn"
            onClick={handlePageBack}
            disabled={page === 1}
        >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
        <p>{page}</p>
        <button
            className="icon-btn Pagination__btn"
            onClick={handlePageForward}
            disabled={page === nmbrOfPages}
        >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
    </div>
     ) : (
        <p style={{color: "#f5f5f5"}}>{page}</p>
    )
  )
}

export default Pagination
