import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
}

const StarRating = ({ value, onChange }: StarRatingProps): React.ReactElement => {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => { onChange(ratingValue) }}
              className="hidden"
            />
            <FaStar
              size={30}
              className="cursor-pointer"
              color={ratingValue <= (hover ?? value) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => { setHover(ratingValue) }}
              onMouseLeave={() => { setHover(null) }}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating
