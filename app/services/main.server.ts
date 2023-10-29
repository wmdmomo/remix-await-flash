import type { ActionArgs, LoaderArgs} from "@remix-run/node";
import { defer, json } from "@remix-run/node";


export const getList = async (index: string) => {
  const list: Promise<{ name: string }[]> = new Promise((r) => {
    setTimeout(() => {
      r([
        { name: `list${index} name1` },
        { name: `list${index} name2` },
      ]);
    }, 1000);
  });
  return await list;
};


export const mainLoader = async (args: LoaderArgs) => {
  const list = getList('1');
  const list2 = getList('2');
  const list3 = getList('3');
  const list4 = getList('4');
  return defer({ list: list, list2, list3, list4 });
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
