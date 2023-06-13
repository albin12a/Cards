import { createSlice } from "@reduxjs/toolkit";
import { cardDetails } from "../../types/card";
import { RootState } from "../store";

interface CardSliceProps {
  cardList: cardDetails[];
}

const initialState: CardSliceProps = {
  cardList: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.cardList = [...action.payload.data];
    },
    deleteCard: (state, action) => {
      state.cardList = state.cardList.filter(
        (val: cardDetails) => val.id !== action.payload.id
      );
    },
    updateCard: (state, action) => {
      state.cardList = state.cardList.map((val: cardDetails) => {
        if (val.id === action.payload.data.id) {
          return action.payload.data;
        }
        return val;
      });
    },
  },
});

export const { addCard, deleteCard, updateCard } = cardSlice.actions;

export const getCardLists = (state: RootState) => state.card.cardList;

export default cardSlice.reducer;
