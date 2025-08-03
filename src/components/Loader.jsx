import loader from '../assets/loader.svg'

const Loader = ({title}) => (
  
  <div className='w-full flex flex-col items-center justify-center'>
    <img src={loader} alt='loader' className='w-32 h-32 object-contain'/>
    <h1 className='text-white font-bold text-2xl mt-2'>
      {title || 'Loading...'}
    </h1>
  </div>
);

export default Loader;
