import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    // cài đặt bộ hẹn giờ khi token hết hạn thì tự động đăng xuất ra sau 1 giờ
    if (!token) {
      return;
    }
    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, 1 * 60 * 60 * 1000);
  }, [token, submit]);

  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
