
export type Product = {
  title: string,
  price: number
}

const data: Product[] = [
  {title: 'Produto A', price: 13},
  {title: 'Produto B', price: 14},
  {title: 'Produto C', price: 24},
  {title: 'Produto X', price: 10},
  {title: 'Produto Y', price: 20},
  {title: 'Produto Z', price: 30}
]

export const Products = {
  getAll: (): Product[] => data,
  getFromPriceAfter: (value: number): Product[] => {
    let products: Product[] = data.filter((item) => item.price >= value)
    return products;
  } 
}