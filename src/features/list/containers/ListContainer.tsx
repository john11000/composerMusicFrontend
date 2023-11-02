import React, { useEffect, useState } from "react";
import ListsTable from "../components/ListTable";
import { ListsProvider } from "../context/List.context";
import ListsSettings from "../components/ListSettings";
import ListsEditDialog from "../components/ListEditDialog";
import useGetLists from "../hooks/useGetList";
import { ILists } from "../models/List.type";

const ListContainer = () => {
  const { getLists: getListsFromApi, loading } = useGetLists();
  const [Lists, setLists] = useState<ILists[]>([]);

  const getLists = async () => {
    try {
      const res = await getListsFromApi();
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
      <ListsTable Lists={Lists} loading={loading} />
      <ListsEditDialog getLists={getLists} />
    </ListsProvider>
  );
};

export default ListContainer;
