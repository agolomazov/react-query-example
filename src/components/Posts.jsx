import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { Post } from './Post';
import { DetailedPost } from './DetailedPost';

import { postsService } from '../api/posts';
import { MAX_PAGE_SIZE, MAX_POST_PAGES } from '../settings';

export const Posts = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isLoading, isFetching } = useQuery(
    ['get-posts', currentPage],
    async () => {
      const requestData = await postsService.getPosts({
        _limit: MAX_PAGE_SIZE,
        _page: currentPage,
      });
      return requestData.data;
    },
    {
      staleTime: 20_000,
    }
  );

  useEffect(() => {
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery(['get-posts', nextPage], async () => {
      const requestData = await postsService.getPosts({
        _limit: MAX_PAGE_SIZE,
        _page: nextPage,
      });
      return requestData.data;
    });
  }, [currentPage, queryClient]);

  return (
    <>
      {isLoading && <p>Загружаем...</p>}
      {data && isFetching && <p>Обновляем...</p>}
      {data &&
        data.map((post) => (
          <Post key={post.id} {...post} onClick={() => setSelectedPost(post)} />
        ))}

      <div className="action-buttons">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous page
        </button>

        <button
          disabled={currentPage >= MAX_POST_PAGES}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>

      {selectedPost && <DetailedPost id={selectedPost.id} />}
    </>
  );
};
