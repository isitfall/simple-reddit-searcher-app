import { useRef, useCallback, useEffect } from "react";

export interface UseInfiniteScroll {
  handleLoadMore: (isIntersecting: boolean) => void;
}

export const useInfiniteScroll = ({ handleLoadMore }: UseInfiniteScroll) => {
  const loadMoreRef = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        handleLoadMore(target.isIntersecting);
      }
    },
    [handleLoadMore],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
  }, [handleObserver]);

  return { loadMoreRef };
};
