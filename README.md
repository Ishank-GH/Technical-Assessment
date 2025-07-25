# SecureSight Dashboard - Technical Assessment

This project was created to fulfill the mandatory and optional timeline requirements of the Fullstack Developer Intern technical assessment for Instinctive Studio.

### **Live Demo**

[**SecureSight DashBoard**](https://secure-sight-roan.vercel.app/)

---

### **Deployment Instructions**

To run this project on your local machine, please follow these steps:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Ishank-GH/Technical-Assessment.git
    cd secure-sight-dashboard
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    Create a file named `.env.local` in the project root and add your Supabase connection string. The `?pgbouncer=true` parameter is required for compatibility between Supabase's connection pooler and Prisma.
    ```
    DATABASE_URL="YOUR_SUPABASE_CONNECTION_STRING?pgbouncer=true"
    NEXT_PUBLIC_API_URL="http://localhost:3000"
    ```

4.  **Set Up the Database**
    Run the following commands to create the database schema and populate it with 15 mock incidents.
    ```bash
    npx prisma db push
    npx prisma db seed
    ```

5.  **Run the Application**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

### **Technical Decisions**

*   **Architecture:** I chose a full-stack approach using the Next.js App Router. This allowed for efficient server-side data fetching for the initial page load and the creation of dedicated API Routes for client-side mutations (like resolving an incident).
*   **Database & ORM:** I selected Supabase (PostgreSQL) and Prisma as they represent a modern, robust, and scalable backend stack. Prisma's type-safety was particularly valuable for ensuring data integrity between the frontend and backend.
*   **Styling:** Tailwind CSS was used for its utility-first methodology, which enabled me to rapidly build a custom, pixel-perfect UI that is a high-fidelity match of the provided Figma design without writing custom CSS files.
*   **Timeline Logic:** For the optional timeline, I implemented an algorithm to process and arrange overlapping incidents into separate visual rows. This ensures the timeline is readable and functional regardless of the dynamic nature of the data.

---

### **If I Had More Time…**

*   **Real-Time Updates:** I would integrate WebSockets or Supabase Realtime to have new incidents appear on the dashboard instantly without needing a page refresh.
*   **Full Timeline Interactivity:** I would make the timeline's scrubber draggable and have it update the state of the main video player. I would also make the incident pills clickable to jump to that specific event.
*   **Comprehensive Testing:** I would add unit tests for components using Jest and React Testing Library, and implement end-to-end tests with Cypress to guarantee application stability.
*   **Authentication:** I would secure the dashboard behind a proper login system, likely using Supabase Auth.
