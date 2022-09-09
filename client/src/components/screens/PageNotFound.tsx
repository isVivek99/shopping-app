import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div className='screen '>
      <div className='d-flex justify-content-center position-relative'>
        <div className='position-relative'>
          <img
            src='https://c.tenor.com/x0OBSRYWzW8AAAAd/blinks.gif'
            alt=''
            className='mx-auto'
          />
          <div className=''>
            <h1
              className='text-white position-absolute'
              style={{ top: '50px', left: '220px' }}
            >
              404
            </h1>
            <h1
              className='text-white position-absolute'
              style={{ bottom: '50px', left: '100px' }}
            >
              PageNotFound
            </h1>
          </div>
        </div>
      </div>
      <div className='text-center mt-3'>
        <Link to={'/'} className='text__link'>
          <p>
            {' '}
            <span style={{ border: '1px solid gray' }}> go back to home</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
