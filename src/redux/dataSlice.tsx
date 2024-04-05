import { createSlice } from "@reduxjs/toolkit";
import { Book, UserData } from "./userSlice";

export interface onBoarding {
  onboardingTitle: string;
  onBoardingDescription: string;
  onBoardingImages: string;
}
export interface Data {
  genres: Array<string>;
  months: Array<string>;
  images: Array<string>;
  selectedBook: Book | null;
  filter: "update" | "months" | "rating";
  actualFriend: UserData | null;
  isFriendProfile: boolean;
  onboardingArray: onBoarding[];
}

const initialState: Data = {
  genres: [
    "Fantasía",
    "Romance",
    "Histórico",
    "Ciencia ficción",
    "Misterio/Thriller",
    "Terror",
    "Autobiografía",
    "No ficción",
    "Poesía",
    "Otros",
  ],
  months: [
    "Enero",
    "Febreo",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diceimbre",
  ],
  images: [
    "/src/assets/cat.png",
    "/src/assets/dog.png",
    "/src/assets/fish.png",
    "/src/assets/dino.png",
    "/src/assets/bird.png",
  ],
  selectedBook: null,
  filter: "update",
  actualFriend: null,
  onboardingArray: [
    {
      onboardingTitle: "¡Bienvenido!",
      onBoardingDescription:
        "Si has llegado hasta aquí quiere decir que buscas una aplicación para gestionar todos tus libros. ¡Estás de suerte! Esta es la mejor aplicación de mercado para justo eso, gestionar tu biblioteca y tener un control sobre tus lecturas.",
      onBoardingImages: "/src/assets/books.png",
    },
    {
      onboardingTitle: "Ten a mano tus estanterías",
      onBoardingDescription:
        "De manera fácil e intuitiva podrás saber cuántos libros te has leído en lo que va de año y tus lecturas pendientes.",
      onBoardingImages: "/src/assets/bookshelf3.png",
    },
    {
      onboardingTitle: "Comparte con tus amigos",
      onBoardingDescription:
        "También puedes ver los libros de tus amigos, saber cómo los han valorado y competir a ver quién es el que ha leído más.",
      onBoardingImages: "/src/assets/reading-friends2.png",
    },
    {
      onboardingTitle: "Busca cualquier libro",
      onBoardingDescription:
        "Tenemos un buscado dónde podrás buscar cualquier libro y leer su descripción",
      onBoardingImages: "/src/assets/book-stars2.png",
    },
  ],
  isFriendProfile: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    deleteSelectedBook: (state) => {
      state.selectedBook = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setActualFriend: (state, action) => {
      state.actualFriend = action.payload;
    },
    setIsFriendProfile: (state, action) => {
      state.isFriendProfile = action.payload;
    },
  },
});

export const {
  setSelectedBook,
  setFilter,
  setActualFriend,
  setIsFriendProfile,
  deleteSelectedBook,
} = dataSlice.actions;

export default dataSlice.reducer;
