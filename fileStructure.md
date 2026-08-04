code-tracker-v1/
├── client/                         # Frontend (React / Vite)
│   ├── public/
│   │   └── platform-icons/         # Icons for LeetCode, CodeChef, Codeforces
│   └── src/
│       ├── assets/                 # Styles, SVG icons, static media
│       ├── components/
│       │   ├── common/             # Reusable UI (Buttons, Badges, Modals, Spinners)
│       │   ├── dashboard/          # Dashboard specific components
│       │   │   ├── FileDropzone.jsx    # PDF / Excel upload handler
│       │   │   ├── ParseStatusCard.jsx # Progress/success banner
│       │   │   └── ProblemTable.jsx    # Parsed problems list with action buttons
│       │   └── workspace/          # Split-screen IDE components
│       │       ├── SplitPane.jsx       # Resizable workspace container
│       │       ├── ProblemView.jsx     # Left panel: HTML rendering & constraints
│       │       ├── CodeEditor.jsx      # Right top: Monaco / Ace editor integration
│       │       ├── ConsoleDrawer.jsx   # Right bottom: Test cases, stdout & execution results
│       │       └── ActionHeader.jsx    # Language selector, Run, and Submit buttons
│       ├── hooks/                  # Custom React hooks (useIDE, useFileParser)
│       ├── pages/
│       │   ├── DashboardPage.jsx   # Route: /dashboard
│       │   └── WorkspacePage.jsx   # Route: /solve/:problemId
│       ├── services/               # Axios API client setup
│       │   ├── api.js              # Base API configuration
│       │   └── problemApi.js       # Endpoints: parseSheet, getProblem, submitCode
│       ├── App.jsx
│       └── main.jsx
│
├── server/                         # Backend (Node.js / Express)
│   ├── config/                     # Environment & DB connection
│   │   ├── db.js                   # Database connector (PostgreSQL / MongoDB)
│   │   └── redis.js                # Queue / Cache connection
│   ├── controllers/
│   │   ├── sheetController.js      # Handles file upload & parsing trigger
│   │   └── problemController.js    # Handles GET problem details & submission
│   ├── middleware/
│   │   ├── upload.js               # Multer config for file buffer handling
│   │   └── errorHandler.js       # Centralized error response formatter
│   ├── models/                     # Database Schemas / Prisma Models
│   │   ├── Sheet.js                # Upload history & parsed references
│   │   └── Problem.js              # Cached problem HTML, title, constraints, test cases
│   ├── routes/
│   │   ├── sheetRoutes.js          # POST /api/sheets/parse
│   │   └── problemRoutes.js        # GET /api/problems/:id, POST /api/problems/execute
│   ├── services/
│   │   ├── parsers/                # Document extraction modules
│   │   │   ├── pdfParser.js        # Text extraction via pdf-parse
│   │   │   └── regexRules.js       # Extractor patterns for LC/CC/CF URLs
│   │   └── fetchers/               # External platform resolvers
│   │       ├── leetcodeFetcher.js  # GraphQL scraper for LeetCode
│   │       ├── codechefFetcher.js  # Web scraper for CodeChef
│   │       └── codeforcesFetcher.js# Official REST API integration
│   ├── tests/
│   │   ├── fixtures/               # Real-world test files
│   │   │   └── ds_training_sheet_2nd_year.pdf
│   │   └── sheetParser.test.js     # Integration test for PDF extraction
│   ├── index.js                    # Server entry point
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                    # Root workspace package.json