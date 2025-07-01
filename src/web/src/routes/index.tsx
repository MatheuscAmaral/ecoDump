import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Layout } from "@/components";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dumpsters from "@/pages/dumpsters";
import Residues from "@/pages/residues";
import Operations from "@/pages/operations";
import Rent from "@/pages/rent";
import SignIn from "@/pages/sign/sign-in";
import SignUp from "@/pages/sign/sign-up";
import Clients from "@/pages/clients";
import Locations from "@/pages/locations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/dumpsters",
    element: (
      <ProtectedRoute>
        <Layout>
          <Dumpsters />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/operations",
    element: (
      <ProtectedRoute>
        <Layout>
          <Operations />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/clients",
    element: (
      <Layout>
        <Clients />
      </Layout>
    ),
  },
  {
    path: "/rent",
    element: (
      <ProtectedRoute>
        <Layout>
          <Rent />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/residues",
    element: (
      <ProtectedRoute>
        <Layout>
          <Residues />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/locations",
    element: (
      <ProtectedRoute>
        <Layout>
          <Locations />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
