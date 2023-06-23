'use client'

import { HTMLAttributes, Children } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

type CarouselPaginationProps = HTMLAttributes<HTMLDivElement> & {}

export default async function Carousel({
  children,
  className,
  ...props
}: CarouselPaginationProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      {Children.map(children, (child) => (
        <div className="keen-slider__slide">{child}</div>
      ))}
    </div>
  )
}
