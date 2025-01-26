import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import SpinnerFullPage from "./components/SpinnerFullPage";

import ProtectedRoutes from "./pages/ProtectedRoutes";

const HomePage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="product"
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <Product />
                </Suspense>
              }
            />
            <Route
              path="pricing"
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <Pricing />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="app"
              element={
                <ProtectedRoutes>
                  <Suspense fallback={<SpinnerFullPage />}>
                    <AppLayout />
                  </Suspense>
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:cityId" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route
              path="*"
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <PageNotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
