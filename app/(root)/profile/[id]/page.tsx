import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";

const ProfilePage = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;
  return (
    <div className="wrapper page">
      <Header
        subHeader="abc@xyz.com"
        title="John Doe"
        userImg="/assets/images/dummy.jpg"
      />
      {/* <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard {...card} key={card.id} />
        ))}
      </section> */}
    </div>
  );
};

export default ProfilePage;
