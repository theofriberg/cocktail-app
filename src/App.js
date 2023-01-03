import Layout from "./components/Layout"
import Home from "./components/Home"
import NewCocktail from "./features/cocktail/NewCocktail"
import CocktailPage from "./features/cocktail/CocktailPage"
import EditCocktail from "./features/cocktail/EditCocktail"
import About from "./components/About"
import Missing from "./components/Missing"
import RequireAuth from "./features/auth/RequireAuth"
import RequireUser from "./features/auth/RequireUser"
import Login from "./features/auth/Login"
import Register from "./features/auth/Register"
import PersistLogin from "./features/auth/PersistLogin"
import Users from "./features/user/Users"
import UserPage from "./features/user/UserPage"
import UserProfile from "./features/user/UserProfile"
import { Route, Routes } from 'react-router-dom'
import { CocktailProvider } from './context/CocktailContext'

function App() {
  
  return (
    <>
      <CocktailProvider>
        <Routes>
          <Route element={<PersistLogin />}>

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route element={<RequireAuth />}>

                <Route path="myprofile" element={<UserProfile />} />

                <Route path="cocktail">
                  <Route index element={<NewCocktail />} />
                  <Route path=":id" element={<CocktailPage />} />
                  <Route element={<RequireUser />}>
                    <Route path="edit/:id" element={<EditCocktail />} />
                  </Route>
                </Route> {/* END COCKTAIL ROUTE */}
              
                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path=":id" element={<UserPage />} />
                </Route> {/* END USERS ROUTE */}
              
              </Route>
              
              <Route path="about" element={<About />} />
              <Route path="*" element={<Missing />} />
            </Route> {/* END INDEX ROUTE */}

          </Route>
        </Routes>
      </CocktailProvider>
    </>
  )
}

export default App;
