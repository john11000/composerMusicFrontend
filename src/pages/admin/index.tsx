import React, { useEffect } from "react";
import AdminLayout from "@/features/commons/admin-layout/AdminLayout";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";

export default function DashboardPage() {
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(setAppBarTitle("Dashboard"));
  }, [dispatcher]);
  return <AdminLayout>DashboardPage</AdminLayout>;
}
