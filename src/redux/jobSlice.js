import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },

        updateApplication(state, action) {
            const updatedJob = action.payload;
            state.allAppliedJobs = state.allAppliedJobs.map((job) =>
                job.id === updatedJob.id ? updatedJob : job
            );
        },
       
        setNewApplication(state, action) {
            state.allAppliedJobs.push(action.payload); 
        },
       
        deleteJob(state, action) {
            const jobId = action.payload;
            state.allAppliedJobs = state.allAppliedJobs.filter((job) => job.id !== jobId);
        },

        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
     setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    updateApplication,
    setNewApplication,
    deleteJob,
    setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;