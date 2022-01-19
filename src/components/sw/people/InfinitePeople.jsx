import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from 'react-query';

import { Person } from "./Person";
import { SW_API } from '../../../settings';

const initialUrl = `${SW_API}/people/`;
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    'sw-people',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage, allPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.toString()}</div>
  }

  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {!data && null}
      {isFetching && <div className="loading">Loading...</div>}
      {data &&
        data.pages.map((pageData) => {
          return pageData.results.map((people) => (
            <Person key={people.name} {...people} />
          ));
        })}
    </InfiniteScroll>
  );
}
