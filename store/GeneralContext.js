import { createContext, useState, useReducer, useEffect } from "react";
import { fetchData } from "../util/http";
import Toast from 'react-native-root-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants } from "../util/consts";
import { ToastMsg } from "../util/strings";

const functionality = {
  add: 'ADD',
  delete: 'DELET',
  deleteAll: 'DELETALL',
  replaceAll: 'REPLACEALL',
}

export const GeneralContext = createContext({
  isLoading: false,
  animeList: [],
  fetchAnime: () => { },
  myAnimeListState: [],
  addAnime: (animeItem) => { },
  deleteAnime: (mal_id) => { },
  myAnimeListStoreing: () => { },
  myAnimeListProvider: () => { },
});


const animeReducer = (state, action) => {
  switch (action.type) {
    case functionality.add:
      return [{ ...action.payload }, ...state];
    case functionality.delete:
      Toast.show(ToastMsg.animeDeleted, {
        duration: 1000,
      });
      return state.filter((item) => item.mal_id !== action.payload);
    case functionality.deleteAll:
      Toast.show(ToastMsg.animeDeletedAll, {
        duration: 1000,
      });
      return [];
    case functionality.replaceAll:
      return action.payload;
    default:
      return state;
  }
};

const GeneralContextProvider = ({ children }) => {
  const [animeList, setAnimeList] = useState([]);
  const [myAnimeListState, dispatch] = useReducer(animeReducer, []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (myAnimeListState && myAnimeListState.length === 0) {
      return;
    }
    myAnimeListStoreing();
  }, [myAnimeListState]);

  useEffect(() => {
    myAnimeListProvider();
  }, []);

  const myAnimeListStoreing = async () => {

    const stringList = JSON.stringify(myAnimeListState);
    try {
      await AsyncStorage.setItem(Constants.animeList, stringList);
    } catch (error) {
      console.log(error);
    }
  }

  const myAnimeListProvider = async () => {
    try {
      const stringAnimeListTemp =
        await AsyncStorage.getItem(Constants.animeList);
      if (stringAnimeListTemp && !(stringAnimeListTemp === "null")) {
        const afterParse = JSON.parse(stringAnimeListTemp);
        const appFlag = await AsyncStorage.getItem(Constants.appResetFlag);
        if (appFlag !== 'true') {
          dispatch({ type: functionality.replaceAll, payload: afterParse });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addAnime = (animeItem) => {
    dispatch({ type: functionality.add, payload: animeItem });
    AsyncStorage.setItem(Constants.appResetFlag, 'false');
    setAnimeList([animeItem, ...animeList]);
  }

  const deleteAnime = (mal_id) => {
    setAnimeList(animeList.filter((item) => item.mal_id !== mal_id));
    dispatch({ type: functionality.delete, payload: mal_id });
  }

  const deleteAllAnime = () => {
    setAnimeList(animeList.filter((listItem1) => myAnimeListState.every((listItem2) => listItem1.mal_id !== listItem2.mal_id)));
    AsyncStorage.setItem(Constants.appResetFlag, 'true');
    dispatch({ type: functionality.deleteAll });
  }

  const fetchAnime = async (page) => {
    try {
      setIsLoading(true);
      const list = await fetchData(page);
      const stringAnimeListTemp =
        await AsyncStorage.getItem(Constants.animeList);
      const afterParse = JSON.parse(stringAnimeListTemp);
      const appFlag = await AsyncStorage.getItem(Constants.appResetFlag);
      if (page > 1) {
        Toast.show(`Loaded ${page} out of 727`, {
          duration: 1000,
          position: -85,
        });
        setAnimeList([...animeList, ...(list.data)]);
      }
      else {
        if (afterParse && appFlag && appFlag !== 'true')
          setAnimeList([...afterParse, ...list.data]);
        else {
          setAnimeList(list.data);
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        isLoading,
        animeList,
        fetchAnime,
        myAnimeListState,
        addAnime,
        deleteAnime,
        deleteAllAnime,
        myAnimeListStoreing,
        myAnimeListProvider
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export { GeneralContextProvider };
export default GeneralContext;
