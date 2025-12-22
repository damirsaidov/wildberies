import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-self-center'>
      <div className="flex max-w-300 m-auto justify-between">
        <div className="flex flex-col">
            <h1 className='text-center text-5xl text-red-600 p-11'>По вашему запросу ничего не найдено</h1>
            <button className='wb-btn w-36 p-5 m-auto' onClick={() => navigate("/")}>На главную</button>
        </div>

      </div>
    </div>
  )
}

export default Error
