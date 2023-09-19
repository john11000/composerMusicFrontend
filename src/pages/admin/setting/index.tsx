import AdminLayout from "@/features/commons/admin-layout/AdminLayout";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ProductsPage() {
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(setAppBarTitle("Configuración"));
  }, [dispatcher]);
  return <AdminLayout>settings</AdminLayout>;
}
