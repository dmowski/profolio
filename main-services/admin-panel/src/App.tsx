import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Alert } from "./components";
import { AdminProfilePage, CustomersPage, TestApiPage } from "./views";
import { AlertState, AuthState } from "./store";

import "./styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <AlertState>
        <AuthState>
          <Navbar />
          <div className="container pt-4">
            <Alert />
            <Routes>
              <Route path="/" element={<TestApiPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/test-api" element={<TestApiPage />} />
              <Route path="/admin-pofile" element={<AdminProfilePage />} />
            </Routes>
          </div>
        </AuthState>
      </AlertState>
    </BrowserRouter>
  );
}
