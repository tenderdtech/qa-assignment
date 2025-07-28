# Equipment Status Tracker

A full-stack web application for monitoring and managing equipment status in real-time. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Equipment Management**: View and manage equipment status
- **Real-time Updates**: Status changes are reflected immediately
- **Status History**: Track complete history of status changes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark/light mode detection

## 🏗️ Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: In-memory storage (mock data)
- **Deployment**: Vercel

## 📋 Equipment Status Types

- **Active** (Green) - Equipment is currently in use
- **Idle** (Yellow) - Equipment is available but not in use
- **Under Maintenance** (Red) - Equipment is being serviced

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tenderdtech/qa-assignment.git
cd qa-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Environment Variables

No environment variables required for this demo application.

## 📊 Mock Data

The application includes pre-populated mock data:

- 5 equipment items with different statuses
- Status history for each equipment
- Realistic timestamps and operator names

## 📝 License

This project is created for QA engineering assessment purposes.
