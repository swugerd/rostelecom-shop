'use client'
import BestSellerGoods from '@/components/modules/MainPage/BestsellerGoods'
import BrandLife from '@/components/modules/MainPage/BrandLife'
import Categories from '@/components/modules/MainPage/Categories/Categories'
import Hero from '@/components/modules/MainPage/Hero/Hero'
import NewGoods from '@/components/modules/MainPage/NewGoods'
import { MainPageGate } from '@/context/goods'
import { useGate } from 'effector-react'

const MainPage = () => {
  useGate(MainPageGate)

  return (
    <main>
      <Hero />
      <Categories />
      <NewGoods />
      <BestSellerGoods />
      <BrandLife />
    </main>
  )
}

export default MainPage
