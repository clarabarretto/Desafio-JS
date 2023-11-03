class Book {
    constructor({ id, title, author, description }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
    }
}

class Library {
    constructor() {
        this.nextBookId = 1;
        this.booksArray = [];
    }

    addBook = bookInfo => {
        if (!bookInfo.author || !bookInfo.description || !bookInfo.title) {
            return "Please provide valid book information.";
        }

        const existingBook = this.booksArray.find(book => book.title === bookInfo.title);

        if (existingBook) {
            return `A book with the title "${bookInfo.title}" already exists in the library.`;
        }

        const book = new Book({
            id: this.nextBookId,
            ...bookInfo
        });

        this.booksArray.push(book);
        this.nextBookId++;

        return `Successfully added ${book.title} to the library.`;
    }

    getBooks = () => {
        if (!this.booksArray || !this.booksArray.length) {
            return 'There are zero books in the library';
        }

        return this.booksArray;
    }

    findBook = id => {
        const bookIndex = this.booksArray.findIndex(book => book.id === id);

        if (bookIndex === -1) {
            return `Book not found in the library.`;
        }

        return this.booksArray[bookIndex];
    }

    removeBook = id => {
        const bookIndex = this.booksArray.findIndex(book => book.id === id);
        
        if (bookIndex === -1) {
            return `Book not found in the library.`;
        }
        
        const removedBook = this.booksArray[bookIndex];
        this.booksArray.splice(bookIndex, 1);
        
        return `Successfully removed "${removedBook.title}".`;
    }    

    updateBook = (id, changes) => {
        const bookIndex = this.booksArray.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            return `Book not found in the library.`;
        }

        const updatedBook = {
            id: id,
            title: changes.title || this.booksArray[bookIndex].title,
            description: changes.description || this.booksArray[bookIndex].description,
            author: changes.author || this.booksArray[bookIndex].author
        };

        this.booksArray[bookIndex] = updatedBook;
        return `Successfully updated "${updatedBook.title}".`;
    }
}

const library = new Library();

console.log(library.addBook({
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "It tells the story of Elizabeth Bennet, a headstrong and independent young woman, and her tumultuous relationship with the enigmatic Mr. Darcy.",
}));

console.log(library.addBook({
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "It explores themes of racial injustice and moral growth through the eyes of a young girl named Scout Finch in the American South during the 1930s.",
}));

console.log(library.addBook({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "It delves into the lives of the wealthy elite of the Roaring Twenties, as seen through the eyes of Nick Carraway, and the enigmatic Jay Gatsby.",
}));

console.log(library.addBook({
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    description: "It is a psychological novel that explores the inner turmoil of Rodion Raskolnikov, a young and impoverished student who commits a heinous crime. The book delves into themes of morality, guilt, and the consequences of one's actions.",
}));

console.log(library.findBook(2));

console.log(library.updateBook(3, {
    description: 'Great Book'
}));

console.log(library.removeBook(1));

console.log(library.getBooks());
