const Cart = require('../model/CartModel');


const addBookToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        const quantity = req.body.quantity;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                books: [{ book: bookId, quantity }],
                total_price: 0
            });
        } else {
            const index = cart.books.findIndex(book => book.book.toString() === bookId);

            if (index !== -1) {
                cart.books[index].quantity += quantity;
            } else {
                cart.books.push({ book: bookId, quantity });
            }
        }

        // Calculate total price
        cart.total_price = cart.books.reduce((total, book) => {
            // Assuming you have a function getBookPrice(bookId) that returns the price of a book
            return total + book.quantity * getBookPrice(book.book);
        }, 0);

        await cart.save();
        res.status(200).send({ message: 'Book added to cart successfully' });
    } catch (error) {
        console.error('Error adding book to cart:', error);
        res.status(500).send({ message: 'Error adding book to cart' });
    }
}



const removeBookFromCart = async (req, res) => {
    try {
        // Find the cart associated with the user
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Check if the book is already in the cart
        const bookIndex = cart.books.findIndex(book => book.book.toString() === req.params.bookId);
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found in cart' });

        // Remove the book from the cart
        cart.books.splice(bookIndex, 1);
        await cart.save();

        return res.status(200).json({ message: 'Book removed from cart' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const updateBookQuantity = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // check if the book is already in the cart
        const bookIndex = cart.books.findIndex(b => b.book.toString() === bookId);
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found in cart' });

        cart.books[bookIndex].quantity = quantity;
        await cart.save();
        return res.json({ message: 'Quantity updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('books.book');
        console.log(cart.books);
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


const clearCart =async (req, res) => {
    try{
        const cart =await Cart.findOne({ user: req.user._id })
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

   cart.books=[]
   cart.total_price=0
   await cart.save();
   return res.status(200).json({ message: 'Cart cleared' });

    }catch(err){
        res.status(500).json({ error: 'Error clearing cart' });
    }
  
}


const calculateTotalPrice = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('books.book');
        let totalPrice = 0;
        cart.books.forEach(book => {
            totalPrice += book.book.price * book.quantity;
        });
        cart.total_price = totalPrice;
        await cart.save();
        return res.status(200).json({ total_price: totalPrice });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { addBookToCart, removeBookFromCart, updateBookQuantity, getCart, clearCart, calculateTotalPrice };
