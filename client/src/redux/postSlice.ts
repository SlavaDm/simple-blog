import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostDTO } from '../dto/post.dto';
import { IPostSlice } from '../interface/IPostSlice';
import { PostsService } from '../service/PostsService';

export const fetchCountOfAllPages = createAsyncThunk(
  'post/fetchCountOfAllPages',
  async () => {
    const countOfThePosts = await PostsService.getCountOfThePosts();
    const countOfThePages = Math.ceil(countOfThePosts / 5);
    return countOfThePages;
  }
);

export const fetchGetPosts = createAsyncThunk(
  'post/fetchGetPosts',
  async (page: number) => {
    const posts = await PostsService.getPosts((page - 1) * 5 + 1, page * 5);
    return posts;
  }
);

export const fetchGetPostByID = createAsyncThunk(
  'post/fetchGetPostByID',
  async (id: number) => {
    const post = await PostsService.getPost(id);
    return post;
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [] as PostDTO[],
    currentPage: 1,
    allPages: 0,
    postById: {
      userId: -1,
      id: -1,
      title: '',
      body: '',
    } as PostDTO,
  },
  reducers: {
    setPosts(state: IPostSlice, action: { payload: { posts: PostDTO[] } }) {
      state.posts = action.payload.posts;
    },
    setCurrentPage(
      state: IPostSlice,
      action: { payload: { currentPage: number } }
    ) {
      state.currentPage = action.payload.currentPage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountOfAllPages.fulfilled, (state, action) => {
      state.allPages = action.payload;
    });
    builder.addCase(fetchGetPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchGetPostByID.fulfilled, (state, action) => {
      state.postById = action.payload;
    });
  },
});

export default postSlice.reducer;
export const { setPosts, setCurrentPage } = postSlice.actions;
