import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
} from '../store/cartSlice';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';
import { toast } from 'sonner';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from './constant';

export function useCart() {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart?.items || []);
    const totalItem = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const add = (product: Product, quantity = 1) => {
        if (product.stock === 0) {
            toast.error(ERROR_MESSAGE.OUT_OF_STOCK);
            return;
        }
        const cartItem: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
            thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
            discountPercentage: product.discountPercentage || 0,
            stock: product.stock,
        };

        dispatch(addToCart(cartItem));
        toast.success(SUCCESS_MESSAGE.ADD_TO_CART);
    };

    const remove = (id: number) => {
        dispatch(removeFromCart(id));
        toast.success(ERROR_MESSAGE.REMOVED_FROM_CART);
    };
    const update = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };
    const clear = () => {
        dispatch(clearCart());
        toast.success("Cart cleared");
    };

    return {
        items,
        totalItem,
        subtotal,
        add,
        remove,
        update,
        clear,
    };
}
