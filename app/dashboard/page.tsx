"use client";
import React from "react";

import { useAuth } from "@/redux/AuthProvider/AuthProvider";
import UserHeader from "@/components/UserHeader/UserHeader";

const Dashboard = () => {
  const { user, accountInfo, logout } = useAuth();

  return (
    <div>
      <main>
        <h1>Добро пожаловать в панель управления</h1>
        <p>Здесь может находиться ваша информация или панель управления.</p>
      </main>
    </div>
  );
};

export default Dashboard;
