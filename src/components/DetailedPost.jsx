import { useQueries, useMutation } from 'react-query';

import { postsService } from '../api/posts';

export const DetailedPost = ({ id }) => {
  const deleteMutation = useMutation((postId) =>
    postsService.deletePost(postId)
  );
  const updateMutation = useMutation((postId) =>
    postsService.updatePost(postId)
  );
  const [responsePost, responseComments] = useQueries([
    {
      queryKey: ['detailed-post', id],
      queryFn: async () => {
        const postRequest = await postsService.getPostById(id);
        return postRequest.data;
      },
      staleTime: 20_000,
    },
    {
      queryKey: ['detailed-post-comments', id],
      queryFn: async () => {
        const postCommentsRequest = await postsService.getPostComments(id);
        return postCommentsRequest.data;
      },
      staleTime: 20_000,
    },
  ]);

  return (
    <>
      <hr />
      {responsePost.isLoading && responseComments.isLoading && (
        <p>Загрузка детальной информации о выбранном посте</p>
      )}
      {deleteMutation.isLoading && <p>Удаление поста...</p>}
      {responsePost.data && (
        <>
          <h3 className="post-title">{responsePost.data.title}</h3>
          <div className="post-actions">
            <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
            <button onClick={() => updateMutation.mutate(id)}>
              Update title
            </button>
          </div>
          <p>
            <b>Подробнее</b>
          </p>
          <p>{responsePost.data.body}</p>
        </>
      )}
      {responseComments.data && (
        <>
          <b>Комментарий ({responseComments.data.length}):</b>
          {responseComments.data.map((comment) => (
            <div key={comment.id}>
              <p>
                <i>
                  <a href={`mailto:${comment.email}`}>{comment.email}</a>
                </i>
                :
              </p>
              <p>{comment.body}</p>
              <hr />
            </div>
          ))}
        </>
      )}
    </>
  );
};
