export class Book {
    constructor(title, author, isAvailable = true) {
        this.title = title;
        this.author = author;
        this.isAvailable = isAvailable;
    }
}
export class Library {
    constructor(){
        this.books=[];
    }

    addBook(book){
        this.books.push(book);
        console.log(`Book added: ${book.title} by ${book.author}`);
    }

    borrowBook(title){
        for(const book of this.books){
            if(book.title === title && book.isAvailable){
                book.isAvailable=false;
                console.log(`book borrowed:${book.title} by ${book.author}`);
                return book;
            }
        }
        console.log(`book ${title} is not available`);
        return null;
    }
    returnBook(title){
        for (const book of this.books){
            if(book.title === title && !book.isAvailable){
                book.isAvailable=true;
                console.log(`book returned:${book.title}`);
                return book;
            }
        } 
        console.log('book was either not borrowed or already returned');
        return null
    }
    getAllBooks() {
    return this.books;
  }
}

export const library = new Library();

const book1 = new Book("computer","issac");
const book2 = new Book("eletronics","newton");
const book3 = new Book("civil","yogi");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);