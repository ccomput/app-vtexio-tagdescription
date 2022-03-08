import * as React from 'react'
import { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

// import Shelfitem from './components/Shelfitem'

const Shelf = () => {
  const productContext = useProduct()
  const [productId, setProductId] = useState<string>()
  const [product, setProduct] = useState([]) as any

  useEffect(() => {
    setProductId(productContext.product.productId)
    if (productId) {
      getProduct()
    }
  }, [productContext])

  const listMap = product.map((prod) => prod.metaTagDescription)

  const getProduct = () => {
    fetch(`/api/catalog_system/pub/products/search?fq=productId:${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data)
      })
  }

  return (
    /* <>
      {product ? (
        <>
          {product.map((productBd: any) => (
            <Shelfitem productDescription={product.metaTagDescription} />
          ))}
        </>
      ) : (
        ''
      )}
    </> */
    <p>{listMap}</p>
  )
}

export default Shelf
