import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { FieldPath, doc, getDoc } from "firebase/firestore";

export interface Book {
  title: string;
  author: string;
  pages: number;
  img: string;
  isbn: string;
  status: "reading" | "read" | "wantToRead";
  genre: string;
  rating: number;
  initialDate: string;
  finalDate: string;
}
export interface UserData {
  userName: string;
  userId: string;
  userImg: string;
  userEmail: string;
  userGoal: number;
  favoriteGenres: Array<string>;
  friends: Array<string>;
  books: Book[];
  isAuthenticated: boolean;
  userRanking: number;
}

const initialState: UserData = {
  userName: "",
  userId: "",
  userImg: "",
  userEmail: "",
  userGoal: 0,
  favoriteGenres: [],
  friends: [],
  books: [],
  isAuthenticated: false,
  userRanking: 1,
};

export interface fetchData {
  userId: string;
  field: string | FieldPath;
}

export const fetchDataFromFirestore = createAsyncThunk(
  "firestore/fetchData",
  async (userId: string) => {
    const userRef = doc(db, "userData", userId);
    const docSnapshot = await getDoc(userRef);
    return docSnapshot.data();
  }
);

export const fetchSpecificDataFromFirestore = createAsyncThunk(
  "firestore/fetchSpecificData",
  async ({ userId, field }: fetchData) => {
    const userRef = doc(db, "userData", userId);
    const docSnapshot = await getDoc(userRef);
    return { field, value: docSnapshot.get(field) };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserImg: (state, action) => {
      state.userImg = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserGoal: (state, action) => {
      state.userGoal = action.payload;
    },
    setFavoriteGenres: (state, action) => {
      state.favoriteGenres = action.payload;
    },
    setFriends: (state, action) => {
      const newFriend = [...state.friends, action.payload];
      state.friends = newFriend;
    },
    changeBook: (state, action) => {
      const index = state.books.findIndex(
        (item) => item.isbn === action.payload.isbn
      );
      state.books[index] = action.payload.newBook;
    },
    addBook: (state, action) => {
      const newBook = [...state.books, action.payload];
      state.books = newBook;
    },
    deleteBook: (state, action) => {
      const newBooks = state.books.filter(
        (item) => item.isbn !== action.payload
      );
      state.books = newBooks;
    },
    deleteFriend: (state, action) => {
      const newFriends = state.friends.filter(
        (item) => item !== action.payload
      );
      state.friends = newFriends;
    },
    deleteAllFriends: (state) => {
      state.friends = [];
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setRankingPosition: (state, action) => {
      state.userRanking = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataFromFirestore.fulfilled, (state, action) => {
      state.userId = action.payload?.userId;
      state.userName = action.payload?.userName;
      state.userImg = action.payload?.userImg;
      state.userEmail = action.payload?.userEmail;
      state.favoriteGenres = action.payload?.favoriteGenres;
      state.books = action.payload?.books;
      state.userGoal = action.payload?.userGoal;
      state.friends = action.payload?.friends;
      state.userRanking = action.payload?.userRanking;
    });
    builder.addCase(
      fetchSpecificDataFromFirestore.fulfilled,
      (state: any, action) => {
        const { field, value } = action.payload;
        state[field as keyof UserData] = value;
      }
    );
  },
});

export const {
  setUser,
  setUserId,
  setFavoriteGenres,
  setUserImg,
  setUserEmail,
  setFriends,
  changeBook,
  addBook,
  deleteBook,
  setUserGoal,
  deleteFriend,
  setAuthenticated,
  setRankingPosition,
  setBooks,
  deleteAllFriends,
} = userSlice.actions;

export default userSlice.reducer;
