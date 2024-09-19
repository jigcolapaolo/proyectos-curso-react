import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
  {
    userName: "elonmusk",
    name: "Elon Musk",
    isFollowing: true,
  },
  {
    userName: "marco",
    name: "Marco",
    isFollowing: false,
  },
  {
    userName: "asmongold",
    name: "Zack",
    isFollowing: true,
  },
  {
    userName: "polo",
    name: "Polo",
    isFollowing: false,
  },
];

export function App() {
  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
