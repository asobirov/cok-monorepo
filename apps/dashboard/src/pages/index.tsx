import type { GetServerSidePropsContext, NextPage } from "next";
import { trpc } from "../utils/trpc";

import Skeleton from "@components/skeletons/Skeleton";
import StatCard from "@components/stats/StatCard";
import { ClockOutline, DoubleCheck, EyeEmpty, Hourglass } from "iconoir-react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { NextPageWithLayout } from "src/types";

const QuickStats: React.FC = () => {
  const { data } = trpc.dashboard.getHomePageData.useQuery(undefined, {
    trpc: {
      ssr: false,
    }
  });

  if (!data) {
    return (
      <>
        {
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 flex-1" />
          ))
        }
      </>
    )
  }

  const {
    uni: {
      nextLecOrLab,
      calendarId
    }
  } = data;
  return (
    <>
      <StatCard
        title="Next university lab/lec"
        value={nextLecOrLab ? `${nextLecOrLab.name} - ${nextLecOrLab.date.toLocaleDateString("en-GB", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        })}` : "Nothing planned"}
        icon={<ClockOutline className="text-blue-300" />}
        href={{
          pathname: "/calendar",
          query: calendarId ? { calendarId } : undefined,
        }}
      />
      <StatCard
        title="portfolio views"
        value={data.portfolio.views}
        icon={<EyeEmpty className="text-rose-300" />}
      />
      <StatCard
        title="active taks"
        value={data.tasks.activeCount}
        icon={<Hourglass className="text-amber-200" />}
      />
      <StatCard
        title="Completed tasks this week"
        value={data.tasks.completedThisWeekCount}
        icon={<DoubleCheck className="text-emerald-300" />}
        href="/tasks"
      />
    </>
  )
}

const LazyQuickStats = dynamic(() => Promise.resolve(QuickStats), {
  ssr: false,
})

const Home: NextPageWithLayout = () => {
  const { data } = useSession();

  if (!data) {
    return null
  }

  return (
    <>
      <div className="grid grid-flow-row grid-cols-6 md:grid-cols-12 grid-rows-6 auto-rows-auto w-full self-start gap-4">
        <div className="col-span-6 md:col-span-9 row-span-1">
          <div className="flex gap-4 p-4 border border-whiteAlpha-200 rounded-4xl shadow-lg max-h-52 overflow-scroll">
            <LazyQuickStats />
          </div>
        </div>
        <div className="border border-whiteAlpha-200 rounded-4xl col-span-6 md:col-span-3 row-span-6" />
        <div className="border border-whiteAlpha-200 rounded-4xl col-span-6 md:col-span-4 row-span-4" />
        <div className="border border-whiteAlpha-200 rounded-4xl col-span-6 md:col-span-5 row-span-2" />
        <div className="border border-whiteAlpha-200 rounded-4xl col-span-6 md:col-span-5 row-span-2" />
      </div>
    </>
  );
};

Home.auth = true;

export default Home;
