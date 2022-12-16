import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const headers = () => ({
    'Content-Type': 'application/json',
})

const apiUrl = 'https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app'

const initialState = {
    callLogs: [],
    directory: {
        1231: { name: 'Xavier' },
        1234: { name: 'Private Sports Shop (California)' },
        12321: { name: 'Mackie Garcia' },
        100001: { name: 'Riley Reidd' },
        100002: { name: 'Kaori Saejima' },
        100003: { name: 'China Mastoka' },
        100004: { name: 'Jon Snow' },
        100005: { name: 'Darryl Dixon' },
        200002: { name: 'Luka Doncic' },
        200003: { name: 'James Bond' },
        200004: { name: 'Ja Morant' },
        200005: { name: 'Santa Claus' },
    },
    isLoading: false,
}

export const getCalls = createAsyncThunk('aircall/getCalls', async (name, thunkAPI) => {
    try {
        const response = await axios.get(apiUrl + '/activities', {
            headers: headers(),
        })
        if (response.status === 200) {
            return [...response.data]
        }
        return []
    } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong')
    }
})

const archievedCall = async (callId, is_archived = true) => {
    try {
        const response = await axios.patch(
            apiUrl + `/activities/${callId}`,
            {
                is_archived,
            },
            {
                headers: headers(),
            },
        )
        if (response.status === 200) {
            return { id: callId, status: 'success' }
        }
        return { id: callId, status: 'error' }
    } catch (error) {
        return { id: callId, status: 'error' }
    }
}

export const archievedCalls = createAsyncThunk('aircall/archievedCalls', async (callIds, thunkAPI) => {
    const results = await Promise.all(
        callIds.map(async (id) => {
            return archievedCall(id)
        }),
    )
    return results
})

export const unArchievedCall = createAsyncThunk('aircall/unArchievedCall', async (callId, thunkAPI) => {
    const results = await archievedCall(callId, false)
    return results
})

const AirCallSlice = createSlice({
    name: 'aircall',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCalls.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCalls.fulfilled, (state, action) => {
                state.isLoading = false
                state.callLogs = [...action.payload]
            })
            .addCase(getCalls.rejected, (state, action) => {
                state.isLoading = false
                state.callLogs = []
            })
            .addCase(archievedCalls.pending, (state) => {
                state.isLoading = true
            })
            .addCase(archievedCalls.fulfilled, (state, action) => {
                state.isLoading = false
                const calls = [...action.payload]
                calls.forEach((c) => {
                    if (c.status === 'success') {
                        const targetId = c.id
                        state.callLogs = state.callLogs.map((sc) => {
                            const tempSc = { ...sc }
                            if (tempSc.id === targetId) {
                                tempSc.is_archived = true
                            }
                            return tempSc
                        })
                    }
                })
            })
            .addCase(unArchievedCall.pending, (state) => {
                state.isLoading = true
            })
            .addCase(unArchievedCall.fulfilled, (state, action) => {
                state.isLoading = false
                const callUpdateResult = { ...action.payload }
                if (callUpdateResult.status === 'success') {
                    const targetId = callUpdateResult.id
                    state.callLogs = state.callLogs.map((sc) => {
                        const tempSc = { ...sc }
                        if (tempSc.id === targetId) {
                            tempSc.is_archived = false
                        }
                        return tempSc
                    })
                }
            })
    },
})

// export const {} = AirCallSlice.actions

export default AirCallSlice.reducer
