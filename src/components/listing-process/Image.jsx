
function Image({ image, content }) {
  return (
    <div className='relative flex-1 w-1/2 h-screen px-16 bg-[#f7fef8]'>
      <h1 className='mt-14 text-5xl font-medium text-[#007600]'>{content}</h1>
      <img src={image} alt=""
        className='absolute z-20 top-38 left-16 w-lg h-fit bg-[#f7fef8] bg-transparent' />
      <div className='absolute z-10 left-46 top-40 w-72 h-72 bg-[#f1fbf2] rounded-full'>

      </div>

    </div>
  )
}

export default Image