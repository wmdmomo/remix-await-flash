import {
  Await,
  useFetcher,
  useLoaderData,
  useRevalidator,
} from '@remix-run/react';
import { Suspense, useMemo } from 'react';
import { mainLoader } from '~/services/main.server';

export const loader = mainLoader;
export default function Index() {
  const { list, list2 } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();
  const { submit, load } = useFetcher();
  const promise = useMemo(() => Promise.all([list, list2]), [list, list2]);

  console.log('render again');
  return (
    <div>
      <h1 onClick={() => load('/api/adjust')}>fetcher.load click</h1>
      <h1
        onClick={() => submit(null, { action: '/api/adjust', method: 'post' })}
      >
        fetcher.submit click
      </h1>
      <h1 onClick={revalidate}>revalidate click</h1>

      <Suspense fallback={<div>fallback</div>}>
        <Await resolve={promise}>
          {([list, list2]) => {
            return (
              <>
                {list?.map((item) => (
                  <div key={item.name} style={{ color: 'red' }}>
                    {item?.name}
                  </div>
                ))}
                {list2?.map((item) => (
                  <div key={item.name} style={{ color: 'yellowgreen' }}>
                    {item?.name}
                  </div>
                ))}
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
