import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/home";
import { InputsPage, ButtonsPage, TypographyPage, HeaderPage, CheckboxesPage } from "./views/DesignSystem";
import { AuthState } from "./store";
import { Header } from "./components/core";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthState>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-system-inputs" element={<InputsPage />} />
          <Route path="/design-system-buttons" element={<ButtonsPage />} />
          <Route path="/design-system-typography" element={<TypographyPage />} />
          <Route path="/design-system-header" element={<HeaderPage />} />
          <Route path="/design-system-checkboxes" element={<CheckboxesPage />} />
        </Routes>
      </AuthState>
    </BrowserRouter>
  );
}
