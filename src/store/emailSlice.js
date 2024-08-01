import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmails = createAsyncThunk('emails/fetchEmails', async () => {
  const response = await fetch('https://flipkart-email-mock.now.sh');
  const data = await response.json();
  return data.list;
});

export const fetchEmailBody = createAsyncThunk('emails/fetchEmailBody', async (id) => {
  const response = await fetch(`https://flipkart-email-mock.now.sh?id=${id}`);
  const data = await response.json();
  return { id, body: data.body };
});

const emailSlice = createSlice({
  name: 'emails',
  initialState: {
    emailList: [],
    filteredEmailList: [],  
    currentEmail: null,
    loading: false,
    error: null,
    filter: 'all' 
  },
  reducers: {
    markAsRead: (state, action) => {
      const email = state.emailList.find((email) => email.id === action.payload);
      if (email) email.read = true;
    },
    markAsFavorite: (state, action) => {
      const email = state.emailList.find((email) => email.id === action.payload);
      if (email) email.favorite = !email.favorite;
    },
    filterEmails: (state, action) => {
      state.filter = action.payload;
      if (action.payload === 'all') {
        state.filteredEmailList = state.emailList;
      } else {
        state.filteredEmailList = state.emailList.filter((email) => {
          switch (action.payload) {
            case 'unread':
              return !email.read;
            case 'read':
              return email.read;
            case 'favorite':
              return email.favorite;
            default:
              return true;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.emailList = action.payload;
        state.filteredEmailList = action.payload;  
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmailBody.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.loading = false;
        const email = state.emailList.find((email) => email.id === action.payload.id);
        if (email) email.body = action.payload.body;
        state.currentEmail = email;
      })
      .addCase(fetchEmailBody.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { markAsRead, markAsFavorite, filterEmails } = emailSlice.actions;

export default emailSlice.reducer;
