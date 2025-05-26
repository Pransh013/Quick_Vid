import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import VideoCard from "@/components/VideoCard";
import { getAllVideos } from "@/lib/actions/video";

export default async function HomePage({ searchParams }: SearchParams) {
  const { query, filter, page } = await searchParams;
  const { videos, pagination } = await getAllVideos(
    query,
    filter,
    Number(page || 1)
  );

  return (
    <main className="wrapper page">
      <Header title="All Videos" subHeader="Public Library" />

      {videos?.length > 0 ? (
        <section className="video-grid">
          {videos?.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              {...video}
              id={video.videoId}
              thumbnail={video.thumbnailUrl}
              username={user?.name || "Guest User"}
              userImg={user?.image || ""}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon="/assets/icons/video.svg"
          title="No Videos Found"
          description="Try adjusting your search."
        />
      )}

      {pagination?.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          queryString={query}
          filterString={filter}
        />
      )}
    </main>
  );
}
