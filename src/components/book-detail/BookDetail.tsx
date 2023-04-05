import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from '../../api/base'
import { UserContext, UserContextType } from "../../context/UserContext";
import { Book } from "../../interfaces/BooksInterface";
import { AddBookToCart } from "../../AddBookService/AddBookToCart";

const BookDetail = () => {
    const initBook:Book = {
        id: 0,
        isbn: "",
        title: "",
        author: "",
        publication_year: 0,
        publisher: 0,
        image_s: "",
        image_m: "",
        image_l: "",
        stok: 0,
        average_ratting: 0,
        rattings_count: 0
    }
    const { id } = useParams()
    const [chosenBook, setChosenBook] = useState<Book>(initBook)
    const { user_id } = useContext(UserContext) as UserContextType
    const [buttonText, setButtonText] = useState('Idle')
    const [buttonID, setButtonID] = useState<number>(0)

    const getBookById = async () => {
        try {
            const { data } = await api.get(`/perpustakaan/api/v1/book/${id}`)
            if (data.message === 'Success') {
                setChosenBook(data.data[0])
            } else {
                alert(data.message)
            }
        } catch (error) {
            if (error instanceof Error) {
                // ✅ TypeScript knows error is Error
                console.log(error.message);
            } else {
                console.log('Unexpected error', error);
            }
        }
    }

    const handleAdd = async () => {
        try {
            setButtonID(Number(id))
            setButtonText('Loading')
            await AddBookToCart(Number(id), user_id)
        } catch (error) {
            alert(error)
        }
        setButtonText('Idle')
        setButtonID(0)
    }

    useEffect(() => {
        getBookById()
    }, [id])
    return (
        <div className="bookDetail">
            <h1>Book Detail</h1>
            <div className="card" style={{ width: '50rem' }}>
                <div className="row">
                    <div className="col">
                        <img src={chosenBook.image_l} className="card-img" alt="" style={{ height: '30rem' }} />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title">{chosenBook.title}</h5>
                            <p className="card-text">Author: {chosenBook.author}</p>
                            <p className="card-text">{chosenBook.publication_year}, publisher: {chosenBook.publisher}</p>
                            <p className="card-text">stok tersedia: {chosenBook.stok}</p>
                            <button className="addCart" onClick={handleAdd}>{buttonText === 'Idle' ? 'Add To Cart' : 'Loading...'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetail