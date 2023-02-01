import { useContext, useState } from 'react';
import { AppContext } from '../context/appContext';

interface GenderResponse {
  name: string;
  count: number;
  gender: string;
  probability: number;
}

interface AgeResponse {
  age: number;
  name: string;
  count: number;
}

interface NationalityResponse {
  name: string;
  country: Array<{
    country_id: string;
    probability: number;
  }>;
}

export const PersonInput = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const context = useContext(AppContext);

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    if (username.length) {
      fetchData(username);
    }
  };

  const getGender = async (name: string): Promise<GenderResponse> => {
    const request = await fetch(`https://api.genderize.io?name=${name}`);
    return await request.json();
  };

  const getAge = async (name: string): Promise<AgeResponse> => {
    const request = await fetch(`https://api.agify.io?name=${name}`);
    return await request.json();
  };

  const getNation = async (name: string): Promise<NationalityResponse> => {
    const request = await fetch(`https://api.nationalize.io?name=${name}`);
    return await request.json();
  };

  const fetchData = async (name: string): Promise<void> => {
    context.setLoading(true);
    const age = await getAge(name);
    const gender = await getGender(name);
    const nation = await getNation(name);

    context.setData({ age, gender, nation });
  };

  return (
    <div className='md:col-span-1'>
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            id='username'
            placeholder='Username'
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <button
          type='submit'
          disabled={!username.length}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            !username.length && 'opacity-50'
          }`}
        >
          Determine
        </button>
      </form>
    </div>
  );
};
