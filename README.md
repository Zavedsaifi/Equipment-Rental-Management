# Equipment Rental Management Dashboard

A modern, responsive web application for managing equipment rentals, maintenance, and inventory. Built with React, TailwindCSS, and Context API for state management.

## 🌐 Live Demo

- **Deployed Application**: [View Live Demo](https://equipment-rental-management.vercel.app/)
- **GitHub Repository**: [View Source Code](https://github.com/Zavedsaifi/Equipment-Rental-Management)

## 🚀 Features

- **User Authentication**
  - Secure login system
  - Protected routes
  - Session management

- **Equipment Management**
  - Add, edit, and delete equipment
  - Track equipment status and condition
  - Location tracking
  - Maintenance history

- **Rental Management**
  - Create and manage rental orders
  - Track rental status (Active, Completed, Cancelled)
  - Customer information management
  - Rental fee calculation

- **Maintenance Tracking**
  - Schedule maintenance tasks
  - Track maintenance costs
  - Assign maintenance personnel
  - Maintenance history per equipment

- **Dashboard Analytics**
  - Key Performance Indicators (KPIs)
  - Equipment utilization metrics
  - Revenue tracking
  - Maintenance cost analysis

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **Icons**: React Icons (Feather Icons)
- **Data Persistence**: LocalStorage
- **Form Validation**: Custom implementation
- **UI Components**: Custom components with TailwindCSS

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zavedsaifi/entnt-dashboard.git
   cd entnt-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## 🔐 Authentication

Default test credentials:
- Username: `admin@example.com`
- Password: `admin123`

## 🏗️ Architecture Overview

### Directory Structure
```
src/
├── components/
│   ├── Authentication/
│   ├── Dashboard/
│   ├── Equipment/
│   ├── Layout/
│   ├── Maintenance/
│   └── Rentals/
├── contexts/
│   ├── AuthContext.jsx
│   ├── EquipmentContext.jsx
│   ├── MaintenanceContext.jsx
│   ├── RentalsContext.jsx
│   └── ToastContext.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── EquipmentPage.jsx
│   ├── LoginPage.jsx
│   ├── MaintenancePage.jsx
│   └── RentalsPage.jsx
└── App.jsx
```

### Key Components

1. **Context Providers**
   - `AuthContext`: Manages user authentication state
   - `EquipmentContext`: Handles equipment data and operations
   - `RentalsContext`: Manages rental orders and related operations
   - `MaintenanceContext`: Handles maintenance records and scheduling
   - `ToastContext`: Provides toast notifications

2. **Layout Components**
   - `MainLayout`: Main application layout with sidebar and header
   - `ProtectedRoute`: Route protection for authenticated users

3. **Feature Components**
   - Equipment management forms and lists
   - Rental management forms and lists
   - Maintenance tracking forms and lists
   - Dashboard analytics and charts

## 🎨 UI/UX Design Decisions

1. **Dark Theme**
   - Consistent dark color scheme
   - High contrast for better readability
   - Reduced eye strain for long usage

2. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px)
   - Flexible grid layouts
   - Responsive typography

3. **Form Design**
   - Clear validation feedback
   - Consistent input styling
   - Accessible form controls
   - Responsive form layouts

## ⚠️ Known Issues

1. **Data Persistence**
   - Currently using localStorage for data persistence
   - Data is lost when clearing browser data
   - No data backup functionality

2. **Performance**
   - Large datasets may cause performance issues
   - No pagination implemented for large lists
   - No data caching strategy

3. **Browser Support**
   - May have issues with older browsers
   - Some features require modern browser APIs

## 🔄 Future Improvements

1. **Backend Integration**
   - Implement proper backend API
   - Add database integration
   - Implement real-time updates

2. **Enhanced Features**
   - Add user roles and permissions
   - Implement file uploads for equipment images
   - Add reporting and export functionality
   - Implement search and advanced filtering

3. **Performance Optimizations**
   - Implement data pagination
   - Add data caching
   - Optimize bundle size
   - Add lazy loading for routes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- React team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- React Router for the routing solution
- React Icons for the icon library

## 📦 Deployment

This project is deployed using Vercel. To deploy your own version:

1. Fork the repository
2. Create a Vercel account
3. Connect your GitHub repository to Vercel
4. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Deploy!

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

- Automatic testing on pull requests
- Automatic deployment to Vercel on main branch pushes
- Build status checks
- Code quality checks
