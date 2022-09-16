import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("../common/components/calendar/Calendar"), {
  ssr: false,
});


const Home: NextPage = () => {

  return (
    <div className="flex flex-1 flex-col m-3">
      <Calendar />
    </div>
  );
};

export default Home;
