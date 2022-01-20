import React from "react";
import AdminHeader from "./AdminHeader";
import { Routes, Route, Redirect } from "react-router-dom";
import RequireAuth from "../../components/RequireAuth";
import Loading from "../../components/Loading";
import { Layout } from "../../components/Layout";
import loadable from "@loadable/component";

const EventsComponent = loadable(() => import("./events"), {
  fallback: <Loading />,
});
const AnalyticsComponent = loadable(() => import("./analytics"), {
  fallback: <Loading />,
});
const AdminEventComponent = loadable(() => import("./event"), {
  fallback: <Loading />,
});

const Admin: React.FC = () => {
  const [searchString, setSearchString] = React.useState<string>("");

  return (
    <Routes>
      <Redirect exact path={`event`} to={`events`} />
      <Route
        path={`event/:id`}
        element={
          <RequireAuth>
            <AdminEventComponent />
          </RequireAuth>
        }
      />

      <Layout
        header={
          <AdminHeader
            searchString={searchString}
            setSearchString={setSearchString}
          />
        }
        body={
          <Routes>
            <Route
              path={`events`}
              element={
                <RequireAuth>
                  <EventsComponent searchString={searchString} />
                </RequireAuth>
              }
            />
            <Route
              path={`analytics`}
              element={
                <RequireAuth>
                  <AnalyticsComponent />
                </RequireAuth>
              }
            />
          </Routes>
        }
      />
    </Routes>
  );
};

export default Admin;
