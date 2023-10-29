import { Await, useFetcher, useLoaderData } from '@remix-run/react';
import { Suspense, useMemo } from 'react';
import { mainLoader } from '~/services/main.server';

export const loader = mainLoader;
export default function Index() {
  const { isAuth, welfare, randomNum } = useLoaderData<typeof loader>();
  const { submit } = useFetcher();
  const promise = useMemo(
    () => Promise.all([isAuth, welfare]),
    [isAuth, welfare]
  );
  return (
    <div>
      <h1>{randomNum}</h1>
      <Suspense fallback={<div>loading....</div>}>
        <Await resolve={promise}>
          {([isAuth, welfare]) => {
            return (
              <span
                onClick={() => {
                  if (isAuth && !welfare?.is_received) {
                    submit(null, { action: '/api/receive', method: 'post' });
                  }
                }}
              >
                {!isAuth
                  ? 'authorize'
                  : welfare?.is_received
                  ? 'received'
                  : 'receive'}
              </span>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
