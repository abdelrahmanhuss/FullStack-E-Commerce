import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { all_products } from '../assets/data';

export const ShopContext = createContext();

const ShopContextProvider = ({children})=>{

    const url = "http://localhost:4000";

    const [cartItems,setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const [allProducts] = useState(all_products);
    const [products, setProducts] = useState([]);

    const [token,setToken] = useState(() => {
        return localStorage.getItem("token") || "";
    });

    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },[cartItems]);

    const addToCart = async (id, quantity = 1) => {
    try {
        await axios.post(`${url}/cart/add`, {
            productId: String(id),
            quantity
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setCartItems(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + quantity
        }));

    } catch (err) {
        console.log(err);
    }
};

    const removeFromCart = async(id, removeAll = false) => {
        setCartItems(prev => {
            const updatedCart = {...prev};

            if(removeAll || updatedCart[id] === 1) delete updatedCart[id];
            else updatedCart[id] -= 1;

            return updatedCart;
        });

        if(token){
            try{
                await axios.delete(`${url}/cart/remove`, {
            headers:{Authorization: `Bearer ${token}`},
                    data:{productId:id}
                });
            }catch(err){
                console.log(err);
            }
        }
    };

    const clearCart = async()=>{
        if(token){
            try{
                await axios.delete(`${url}/cart/clear`, {
            headers:{Authorization: `Bearer ${token}`},

                });
                setCartItems({});
            }catch(err){
                console.log(err);
            }
        }
    };

    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [id, quantity]) => {
            const product = products?.find(p => p.id?.toString() === id);
if (!product) return total;
            return total + (product ? product.price * quantity : 0);
        }, 0);
    };

    const fetchProductsList = async()=>{
        try{
            const response = await axios.get(`${url}/products/list`);
            setProducts(response.data.data || []);
        }catch(err){
            console.log(err);
            setProducts(allProducts);
        }
    };

    const loadCartData = async(currentToken)=>{
        try{
            const response = await axios.get(`${url}/cart/get`, {
                headers: {
  Authorization: `Bearer ${currentToken}`,
}
            });
setCartItems(response.data.data?.cartData || response.data.cartData || {});        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchProductsList();

            const storedToken = localStorage.getItem("token");

            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const value = {
        all_products: products,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        url,
        setToken,
        clearCart,
        setCartItems,
        loadCartData
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
};

export default ShopContextProvider;