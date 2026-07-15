import React from 'react'

function CategoryCard({name,image,onClick}) {
  return (
    <div className='w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl shrink-0 overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 relative cursor-pointer group border border-gray-100 card-hover' onClick={onClick}>
     <img src={image} alt="" className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700'/>
     <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300'></div>
     <div className='absolute bottom-0 w-full left-0 px-3 py-2 text-center'>
       <span className='text-white text-sm font-bold drop-shadow-lg tracking-wide'>{name}</span>
     </div>
    </div>
  )
}

export default CategoryCard
