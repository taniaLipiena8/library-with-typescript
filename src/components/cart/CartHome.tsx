import api from '../../api/base'
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from '../../context/UserContext';
import { Cart } from '../../interfaces/CartsInterface';
import CartItem from './CartItem';

const CartHome = () => {
    const navigate = useNavigate()
    const { user_id } = useContext(UserContext) as UserContextType
    const [carts, setCarts] = useState<Cart[]>([])

    const fetchCart = async () => {
        try {
            const resp = await api.get(`/perpustakaan/api/v1/cart?user_id=${user_id}`)
            if (resp.data.code === 200) {
                if (resp.data.message === 'Data not found') {
                    alert('Cart is empty')
                    navigate('/book')
                }
                setCarts(resp.data.data)
            } else {
                alert('gagal fetch cart')
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            const resp = await api.delete(`/perpustakaan/api/v1/cart?user_id=${user_id}&book_id=${id}`)
            if (resp.data.code === 200) {
                alert(resp.data.message)
            } else{
                alert(resp.data.message)
            }
        } catch (error) {
            console.log (error)
        }

        fetchCart()

    }
    
    return (
        <div className="Cart">
            <div className="Cart-list ">
                {carts.map((cartItem) => (
                    <CartItem cartItem = {cartItem} handleDelete={handleDelete} key={cartItem.id}/>
                ))}
            </div>
        </div>
    )
}

export default CartHome