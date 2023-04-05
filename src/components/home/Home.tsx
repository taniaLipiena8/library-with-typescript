import api from '../../api/base'
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { UserContext, UserContextType } from '../../context/UserContext';
import { Book } from '../../interfaces/BooksInterface';
import BookCardView from '../BookCardView/BookCardView';
import BookTableView from '../BookTableView/BookTableView';
import { AddBookToCart } from '../../AddBookService/AddBookToCart';

const Home = () => {
    const navigate = useNavigate()
    const { user_id } = useContext(UserContext) as UserContextType
    const booksPerPage = 20
    const [listLayout, setListLayout] = useState('table')
    const [books, setBooks] = useState<Book[]>([])
    const [pageNumber, setPageNumber] = useState(1)
    const [buttonText, setButtonText] = useState('Idle')
    const [buttonID, setButtonID] = useState<number | null>(null)



    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await api.get(`/perpustakaan/api/v1/book?page=${pageNumber}&limit=${booksPerPage}`)
                if (data.code === 200) {
                    const newBooks = data.data.data_per_page
                    setBooks(newBooks)

                } else {
                    alert('gagal fetch data')
                }

            } catch (error) {
                if (error instanceof Error) {
                    // ✅ TypeScript knows error is Error
                    alert(error.message);
                } else {
                    console.log('Unexpected error', error);
                }
            }
        }
        fetchBooks()
        console.log(books);

    }, [pageNumber])

    const handlePageClick = (data: number) => {
        setPageNumber(data)
    }

    const changeLayout = () => {
        if (listLayout === 'table') {
            setListLayout('card')
            return
        }
        setListLayout('table')
    }

    const handleClick = (id : number) => {
        navigate(`/book/${id}`)
    }

    const handleAdd = async (id: number) => {
        try {
            setButtonID(id)
            setButtonText('Loading')
            await AddBookToCart(id, user_id)
        } catch (error) {
            alert(error)
        }
        setButtonText('Idle')
        setButtonID(0)
    }

    const changeButtonText = (id: number) => {
        if (id === buttonID) {
            if (buttonText !== 'Idle') {
                return 'Loading...'
            }
        }
        return 'Add To Cart'
    }

    return (
        <div className='Home'>
            <h1>Book Collection List</h1>
            <h3 onClick={changeLayout} >Click here to change to {listLayout === 'table' ? 'Card list view' : 'Table list view'}</h3>
            {listLayout === 'table' ?
                <BookTableView books={books}  handleClick={handleClick} handleAdd={handleAdd} changeButtonText={changeButtonText}/>
                :
                <BookCardView books={books}  handleClick={handleClick} handleAdd={handleAdd} changeButtonText={changeButtonText}/>
            }
            <PaginationControl
                page={pageNumber}
                between={3}
                total={260}
                limit={20}
                changePage={(page) => handlePageClick(page)}
                ellipsis={1}
            />
        </div>
    )
}

export default Home