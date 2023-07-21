import React, { FC, MouseEvent } from "react";
import { BaseSearchItem } from "../../types/search-result";
import { BaseButton } from "../common/base-button/base-button";
// import { Loader } from "../common/loader/loader";
import { Card } from "./components/card";
// import { UseInfiniteScroll, useInfiniteScroll } from "./hooks/useInfiniteScroll";

interface List /*extends UseInfiniteScroll*/ {
  items: BaseSearchItem[];
  loading?: boolean;
  showButton?: boolean;
  handleLoadMore: (event: MouseEvent<HTMLElement>) => void;
}

export const List: FC<List> = ({ items, loading, handleLoadMore, showButton }) => {
  // const { loadMoreRef } = useInfiniteScroll({ handleLoadMore });

  return (
    <div className="flex flex-col items-center gap-y-2 max-w-xl w-full">
      {items.map(({ id, title, url, thumbnail }) => (
        <Card key={id} title={title} id={"id"} url={url} thumbnail={thumbnail} />
      ))}
      {/* <div ref={loadMoreRef} className="self-center">
        {loading && <Loader className="loader animate-spin" />}
      </div> */}
      {showButton && (
        <BaseButton
          loading={loading}
          disabled={loading}
          onClick={handleLoadMore}
          label="Load More"
          className="min-w-[50%] flex align-center justify-center"
        />
      )}
    </div>
  );
};
