import React, { useEffect, useState } from "react";
import ListsTable from "../components/ListTable";
import { ListsProvider } from "../context/List.context";
import ListsSettings from "../components/ListSettings";
import ListsEditDialog from "../components/ListEditDialog";
import useGetLists from "../hooks/useGetList";
import { ILists } from "../models/List.type";
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";

const ListContainer = () => {
  const sessionState = useSelector((app: AppStore) => app.authState);
  const { getLists: getListsFromApi, loading } = useGetLists();
  const [Lists, setLists] = useState<ILists[]>([]);

  const getLists = async () => {
    try {
      const res = await getListsFromApi(sessionState.accessToken);
      if (res.data) {
        console.log(res.data.data);
        setLists(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListsProvider>
      <ListsSettings />
      <ListsTable Lists={Lists} loading={loading} getLists={getLists} />
      <ListsEditDialog getLists={getLists} />
    </ListsProvider>
  );
};

export default ListContainer;
