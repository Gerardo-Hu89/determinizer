import { Loading } from './loading';
import { useContext, useEffect } from 'react';
import countries from '../utils/countries.json';
import { AppContext } from '../context/appContext';
import './styles.css';

const rows = [
  { label: 'Name', accessor: ['age', 'name'] },
  { label: 'Estimated age', accessor: ['age', 'age'], suffix: 'years' },
  { label: 'Age based on', accessor: ['age', 'count'], suffix: 'counts' },
  { label: 'Gender', accessor: ['gender', 'gender'] },
  { label: 'Gender probability', accessor: ['gender', 'probability'], suffix: '%' },
  { label: 'Gender based on', accessor: ['gender', 'count'], suffix: 'counts' },
  { label: 'Possible country', accessor: ['nation', 'country'] },
];

export const Results = (): JSX.Element => {
  const context = useContext(AppContext);

  useEffect(() => {
    context.setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.data]);

  return (
    <div className='relative'>
      {context.loading && <Loading />}
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>Name Information</h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Possible Information Determined By Name.
        </p>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          {rows.map((item, index) => {
            const value = context.data?.[item.accessor[0]]?.[item.accessor[1]];
            return (
              <div
                key={`row-${index}`}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className='text-sm font-medium text-gray-500'>{item.label}</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {Array.isArray(value) ? (
                    value.map(
                      (item): JSX.Element => (
                        <div key={item.country_id}>
                          {/*//@ts-ignore */}
                          {`${countries[item.country_id]} - ${item.probability}%`} <br />
                        </div>
                      ),
                    )
                  ) : (
                    <div className='capitalize-first'>
                      {value} {value ? item.suffix : ''}
                    </div>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};
