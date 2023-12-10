import React, { useEffect, useState } from "react";
import ListsTable from "../components/ListTable";
import { ListsProvider } from "../context/List.context";
import ListsSettings from "../components/ListSettings";
import ListsEditDialog from "../components/ListEditDialog";
import useGetLists from "../hooks/useGetList";
import { ILists } from "../models/List.type";
import { useRouter } from "next/router";

const ListContainerFavorites = () => {
  const { getLists: getListsFromApi, loading } = useGetLists();
  const [Lists, setLists] = useState<ILists[]>([]);

  const router = useRouter();

  const paramFromCategory = router.query.category;
  const paramFromCategoryType = router.query.type;

  const getLists = async () => {
    try {
      const res = await getListsFromApi();
      let listFavorites: ILists[] = [];
      if (res.data) {
        if (paramFromCategoryType && paramFromCategory) {
          switch (paramFromCategoryType) {
            case 'tonalidad' : {
              listFavorites = res.data.data.filter((melody : ILists) => melody.scale.toLowerCase() == paramFromCategory.toString().toLowerCase());
            }; break;
            case 'nota' : {
              listFavorites = res.data.data.filter((melody : ILists) => melody.key.toLowerCase() == paramFromCategory.toString().toLowerCase());
            }; break;
            default : {
              listFavorites = res.data.data.filter((melody : ILists) => melody.isFavorite == true);
            }
          }
        } else {
          listFavorites = res.data.data.filter((melody : ILists) => melody.isFavorite == true);
        }
        setLists(listFavorites);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramFromCategory, paramFromCategoryType]);

  return (
    <ListsProvider>
      <ListsSettings />
      <ListsTable Lists={Lists} loading={loading} getLists={getLists} isFiltered={true} />
      <ListsEditDialog getLists={getLists} />
    </ListsProvider>
  );
};

export default ListContainerFavorites;
