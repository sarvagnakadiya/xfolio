// Removed Firebase dependencies

type DataWithDate<T> = T & { createdAt: Date };

export function mergeData<T>(
  sortData: boolean,
  ...tweets: (DataWithDate<T>[] | null)[]
): DataWithDate<T>[] | null {
  const validData = tweets.filter((tweet) => tweet) as DataWithDate<T>[][];
  const mergeData = validData.reduce((acc, tweet) => [...acc, ...tweet], []);

  return mergeData.length
    ? sortData
      ? mergeData.sort((a, b) => +b.createdAt - +a.createdAt)
      : mergeData
    : null;
}
