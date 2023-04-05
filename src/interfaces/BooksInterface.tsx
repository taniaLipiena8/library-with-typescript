export interface Book {
    id: number,
    isbn: string,
    title: string,
    author: string,
    publication_year : number,
    publisher: number,
    image_s : string,
    image_m: string,
    image_l: string,
    stok: number,
    average_ratting: number,
    rattings_count: number
}

export interface BookViewProps {
    books: Book[]
    handleClick: (id: any) => void
    handleAdd : (id: number) => Promise<void>
    changeButtonText: (id: number) => "Loading..." | "Add To Cart"
}