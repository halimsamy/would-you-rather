import React, { useEffect } from "react";
import HomePageNav from "../components/HomePageNav";
import QuestionsList from "../components/QuestionsList";

export default function HomePage() {
  return (
    <div>
      <HomePageNav />
      <QuestionsList />
    </div>
  );
}
