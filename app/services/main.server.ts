import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { defer, json } from '@remix-run/node';

export const getList = async (index: string) => {
  const list = new Promise((r) => {
    setTimeout(() => {
      r([{ name: `list${index} name1` }, { name: `list${index} name2` }]);
    }, 1000);
  });
  return await list;
};

const getAuth = async (): Promise<boolean> => {
  return await new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, 1000);
  });
};

const getWelfare = async (): Promise<{ is_received: boolean }> => {
  return await new Promise((r) => {
    setTimeout(() => {
      r({ is_received: false });
    }, 1000);
  });
};

export const mainLoader = async (args: LoaderArgs) => {
  return defer({
    isAuth: getAuth(),
    welfare: getWelfare(),
    randomNum: Math.random() * 100,
  });
};

const getAdjustUrl = async () => {
  const aa: Promise<{ url: string }> = new Promise((r) => {
    setTimeout(() => {
      r({ url: 'getAdjustUrl' });
    }, 0);
  });
  return await aa;
};

const postAdjustUrl = async () => {
  const aa: Promise<{ url: string }> = new Promise((r) => {
    setTimeout(() => {
      r({ url: 'getAdjustUrl' });
    }, 1000);
  });
  return await aa;
};
export const adjustLoader = async (args: LoaderArgs) => {
  const adjust = await getAdjustUrl();
  return json(adjust);
};

export const postAdjustAction = async (args: ActionArgs) => {
  await postAdjustUrl();
  return json({ code: '-1999' }, { status: 500 });
};
