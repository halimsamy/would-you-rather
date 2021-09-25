import React from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../store/users";
import UserItem from "../components/UserItem";

export default function LeaderboardPage() {
  const users = useSelector(selectUsers);

  const calcTotalScore = (user) =>
    user.questions.length + Object.keys(user.answers).length;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {Object.values(users)
          .sort((a, b) => calcTotalScore(b) - calcTotalScore(a))
          .map((user, index) => (
            <UserItem key={user.id} user={user} index={index} />
          ))}
      </ul>
    </div>
  );
}
