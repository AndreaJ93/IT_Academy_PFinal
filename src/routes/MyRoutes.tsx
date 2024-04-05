import { Route, Routes } from "react-router-dom";
import MainPage from "../features/home/MainPage";
import ProfilePage from "../features/profile/ProfilePage";
import Statistics from "../features/statistics/Statistics";
import LogIn from "../features/auth/LogIn";
import SearchBooks from "../features/searchingpage/SearchBooks";
import SignUp from "../features/auth/SignUp";
import ConfigProfile from "../features/profile/ConfigProfile";
import MyShelf from "../features/myshelf/MyShelf";
import Shelf from "../features/myshelf/Shelf";
import Friends from "../features/friends/Friends";
import FriendProfile from "../features/friends/FriendProfile";
import Competition from "../features/competition/Competition";
import OnBoarding from "../features/onboarding/OnBoarding";
import Config from "../components/Config";
import ProtectedRoutes from "./ProtectedRoutes";
import ListofFriends from "../features/friends/components/ListofFriends";
import SearchFriends from "../features/friends/components/SearchFriends";
import StatisticsGeneral from "../features/statistics/StatisticsGeneral";
import StatisticsCharts from "../features/statistics/StatisticsCharts";
import FriendShelf from "../features/friends/FriendShelf";
import FriendSingleShelf from "../features/friends/FriendSingleSheft";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OnBoarding />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/configprofile" element={<ConfigProfile />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Config />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/statistics" element={<Statistics />}>
            <Route index element={<StatisticsGeneral />} />
            <Route path="general" element={<StatisticsGeneral />} />
            <Route path="charts" element={<StatisticsCharts />} />
          </Route>
          <Route path="/search" element={<SearchBooks />} />
          <Route path="/myshelf" element={<MyShelf />}>
            <Route index element={<Shelf />} />
            <Route path="reading" element={<Shelf />} />
            <Route path="wantToRead" element={<Shelf />} />
            <Route path="read" element={<Shelf />} />
          </Route>

          <Route path="/friends" element={<Friends />}>
            <Route index element={<ListofFriends />} />
            <Route path="listoffriends" element={<ListofFriends />} />
            <Route path="searchfriends" element={<SearchFriends />} />
          </Route>
          <Route path="/friendprofile" element={<FriendProfile />} />
          <Route path="/friendshelf" element={<FriendShelf />}>
            <Route index element={<FriendSingleShelf />} />
            <Route path="reading" element={<FriendSingleShelf />} />
            <Route path="wantToRead" element={<FriendSingleShelf />} />
            <Route path="read" element={<FriendSingleShelf />} />
          </Route>

          <Route path="/competition" element={<Competition />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MyRoutes;
