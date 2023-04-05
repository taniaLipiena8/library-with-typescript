import api from '../api/base'

export const AddBookToCart = async (bookid : number, user_id : string|null) => {
    
    try {
      const response = await api.post('/perpustakaan/api/v1/cart', {
        user_id: user_id,
        book_id: bookid
      })
  
      if (response.data.message === 'Data cart Created') {
        console.log(response.data);
        alert('Book succesfully added')
        return Promise.resolve(response)
      } else {
        return Promise.reject(response.data.message)
      }
    }
    catch (error) {
      return Promise.reject(error)
    }
  }