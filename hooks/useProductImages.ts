import { idGenerator } from '@/lib/utils/common'
import { IProduct } from '@/types/common'
import { useMemo } from 'react'

export const useProductImages = (product: IProduct) => {
  const images = useMemo(() => {
    const makeImagesObject = (imagesArray: string[]) =>
      imagesArray.map((item) => ({
        src: item,
        alt: product.name,
        id: idGenerator(),
      }))

    if (product.images.length < 4) {
      const images = []

      for (let i = 0; i < 4; i++) {
        images.push(product.images[0])
      }

      return makeImagesObject(images)
    }

    return makeImagesObject(product.images)
  }, [product.images, product.name])

  return images
}
