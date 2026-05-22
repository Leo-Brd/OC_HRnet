import { createSlice } from "@reduxjs/toolkit"

// Hydratation initiale depuis localStorage (compatibilité avec les données existantes)
const loadFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("employees")) || []
  } catch {
    return []
  }
}

const employeesSlice = createSlice({
  name: "employees",
  initialState: loadFromStorage(),
  reducers: {
    addEmployee(state, action) {
      state.push(action.payload)
      // Persistance dans localStorage pour garder les données entre les rechargements
      localStorage.setItem("employees", JSON.stringify(state))
    },
  },
})

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer
