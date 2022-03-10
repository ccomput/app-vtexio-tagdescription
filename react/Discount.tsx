import * as React from 'react'
import { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

import styles from './styles.css'

const Discount = () => {
  const productContext = useProduct()
  const [price, setPrice] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [discountTotal, setDiscountTotal] = useState<number>(0)

  useEffect(() => {
    setPrice(productContext.product.priceRange.sellingPrice.highPrice)

    DiscountCauculation()
  }, [productContext])

  const DiscountCauculation = () => {
    const discount = price * 0.1
    const priceFinal = price - discount

    setDiscountTotal(priceFinal)
    setLoading(true)
  }

  const RenderDiscountPrice = () => {
    return (
      <>
        <div>
          Por:{' '}
          <span className={styles.discount}>
            R${' '}
            {discountTotal.toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}{' '}
          </span>
          (10% OFF no boleto)
        </div>
      </>
    )
  }

  return <>{loading ? <RenderDiscountPrice /> : null}</>
}

export default Discount
