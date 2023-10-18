import React, { useEffect } from "react";
import AdminLayout from "@/features/commons/admin-layout/AdminLayout";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const dispatcher = useDispatch();
  const router = useRouter();
  router.push("/admin/list");
  useEffect(() => {
    dispatcher(setAppBarTitle("Dashboard"));
  }, [dispatcher]);
}
