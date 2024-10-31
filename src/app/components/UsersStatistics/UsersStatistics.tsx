import React, { FC } from "react";
import DashboardUsers from "../icons/DashboardUsers";
import ActiveUsers from "../icons/ActiveUsers";
import UsersWithoans from "../icons/UsersWithoans";
import UsersWithSavings from "../icons/UsersWithSavings";

export interface IUserStats {
  Icon: FC;
  name: string;
  stat: string | number;
}

interface IUsersStatistics {
  users: string;
  activeUsers: string;
  usersWithLoans: number;
  usersWithSavings: number;
  id: string;
}

export default async function UsersStatistics() {
  const res = await fetch(`${process.env.URL}/statistics`);
  const data = await res.json();
  const statistics: IUsersStatistics = data[0];

  const userstats: IUserStats[] = [
    {
      Icon: DashboardUsers,
      name: "users",
      stat: `${Number(statistics.users).toLocaleString()}`,
    },
    {
      Icon: ActiveUsers,
      name: "active users",
      stat: `${Number(statistics.activeUsers).toLocaleString()}`,
    },
    {
      Icon: UsersWithoans,
      name: "users with loans",
      stat: `${statistics.usersWithLoans.toLocaleString()}`,
    },
    {
      Icon: UsersWithSavings,
      name: "users with savings",
      stat: `${statistics.usersWithSavings.toLocaleString()}`,
    },
  ];

  return (
    <div className="userstatistics">
      {userstats.map(({ name, Icon, stat }, index) => (
        <div className="userstat" key={index}>
          <Icon />
          <span className="userstat__users">{name}</span>
          <span className="userstat__number">{stat.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
