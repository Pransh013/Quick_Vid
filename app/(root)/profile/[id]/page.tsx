import Header from "@/components/Header";

const page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;
    return <div className="wrapper page">
        <Header subHeader="abc@xyz.com" title="John Doe" userImg="/assets/images/dummy.jpg"/>
        User Id: {id}</div>;
};

export default page;
