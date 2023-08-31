import { useState, useEffect, useCallback } from 'react'
import ReactPaginate from 'react-paginate'
import Loader from './components/Loader'
import Card from './components/Card'

const BASE_URL = 'https://dummyapi.io/data/v1'
const config = { headers: { "app-id": "62996cb2689bf0731cb00285" } }
const width = window.innerWidth

const App = () => {
    // State
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [posts, setPosts] = useState(null)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    // Function
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch(BASE_URL + `${search ? `/tag/${search}` : ''}/post?page=${page}`, config)
            const data = await res.json()
            const temp = Math.ceil(data.total / 20)
            if (page + 1 > temp) setPage(0)
            setTotal(data.total)
            setPosts(data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(JSON.stringify(error))
        }
    }, [page, search])

    const handlePageChange = (selectedPage) => {
        setLoading(true)
        window.scrollTo(0, 0)
        setPage(selectedPage.selected)
    };

    // Lifecycle
    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Render
    return (
        <main>
            <input
                type="text"
                className="search"
                placeholder="Search by tag"
                onChange={e => {
                    let debounceFunction = setTimeout(() => {
                        setSearch(e.target.value.toLowerCase())
                    }, 1500)

                    return () => clearTimeout(debounceFunction)
                }}
            />
            {
                loading
                    ? <Loader width={width} />
                    : (
                        <section className="grid">
                            {
                                posts?.length
                                    ? posts.map(post => (
                                        <Card
                                            key={post.id}
                                            data={post}
                                        />
                                    ))
                                    : <h3>No Result</h3>
                            }
                        </section>
                    )
            }
            <ReactPaginate
                nextLabel=">"
                previousLabel="<"
                breakLabel="..."
                className="pagination"
                pageLinkClassName="page"
                nextLinkClassName="page"
                previousLinkClassName="page"
                breakLinkClassName="page"
                activeClassName="page-active"
                disabledLinkClassName="disabled"
                renderOnZeroPageCount={null}
                forcePage={page}
                onPageChange={handlePageChange}
                pageCount={Math.ceil(total / 20)}
                pageRangeDisplayed={width > 550 ? 5 : 3}
            />
        </main>
    );
}

export default App;