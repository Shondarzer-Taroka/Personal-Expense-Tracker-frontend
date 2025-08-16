![Expenses Banner](https://i.ibb.co.com/b5tr7dLJ/localhost-3000-expenses.png)

# 💰 Personal Expense Tracker (MERN)

A full-stack Personal Expense Tracker built with **Next.js (App Router)** for the frontend and **Express + MongoDB (Mongoose)** for the backend. Users can **add, view, edit, and delete** expenses, filter by category/date range, and visualize spending via charts.

---

## ✨ 10 Key Features (Frontend + Backend)

1. **Add Expense (Form)**
   - Fields: `title`, `amount`, `category`, `date`.
   - Validates input on the client and server (title min 3, amount > 0, valid date).
   - Friendly toasts and inline error states.

2. **Expense List (Table + Badges)**
   - Clean table layout with **category badges** (Food, Transport, Shopping, Others, …).
   - Responsive on mobile/tablet/desktop with Tailwind.

3. **Edit & Delete (CRUD)**
   - Edit button pre-fills the form with existing values.
   - Delete with confirm dialog (Headless UI Dialog).

4. **Total Spend Overview**
   - Aggregated **Total Expense** component at the top that updates in real-time when you add/edit/delete.

5. **Filtering & Search **
   - Filter by **category**.
   - Client-side pagination for large lists.

6. **Charts (Recharts Pie Chart)**
   - Visualize expenses **by category** using a pie chart.
   - Hover tooltips and legends.

7. **Robust API (REST)**
   - Endpoints: `POST /api/expenses`, `GET /api/expenses`, `PATCH /api/expenses/:id`, `DELETE /api/expenses/:id`.
   - Strict validation and consistent error responses.

8. **JWT-Ready Auth (Bonus)**
   - Optional `POST /api/users/register` & `POST /auth/login` scaffold.
   - Middleware placeholder for protecting routes (easy to enable later).

9. **Production-friendly Setup**
   - Separate `client` and `server` folders, CORS configured, `.env` examples, scripts ready.
   - Works with MongoDB Atlas or local MongoDB.

10. **DX & UX Polishing**
   - Tailwind + Headless UI for accessible interactions.
   - Toast notifications, loading skeletons, and empty-state UI.

---



### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone  https://github.com/Shondarzer-Taroka/Personal-Expense-Tracker-frontend.git
   Personal-Expense-Tracker-frontend

