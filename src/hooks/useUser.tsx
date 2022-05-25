import useSWR from "swr";

export const fetcher = (url: string) => fetch(url)
  .then((response) => response.json()); 

export default function useUser() {
  const { data, mutate } = useSWR('/api/authentication/user', fetcher);
  const loading = !data;
  const user = data?.user;

  return [ user, { mutate, loading }];
}