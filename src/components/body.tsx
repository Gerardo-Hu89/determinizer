import { Results } from './results';
import { PersonInput } from './personInput';

export const Body = (): JSX.Element => (
  <div className='mx-auto max-w-8xl py-6 sm:px-6 lg:px-8'>
    <div className='md:grid md:grid-cols-3 md:gap-6'>
      <PersonInput />
      <div className='mt-5 md:col-span-2 md:mt-0'>
        <div className='shadow sm:overflow-hidden sm:rounded-md'>
          <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
            <Results />
          </div>
        </div>
      </div>
    </div>
  </div>
);
