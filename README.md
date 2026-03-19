# SkillSwap 

SkillSwap is a single-page application (SPA) for skill exchange in the format:
**“I can teach / I want to learn”**.

This is a collaborative project where I was **Team Lead / Frontend Developer**.

---

##  Demo


---

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Router
- SCSS
- Vite / Webpack

---

## My Role

- Led frontend development in a team environment  
- Planned and managed tasks using Kanban board  
- Reviewed pull requests and ensured code quality  
- Maintained project architecture and consistency  
- Refactored unstable parts of the application  

---

## Features

- Multi-step registration flow (3 steps)
- Skill creation and management
- Search and filtering system
- Favorites and notifications
- Skill exchange requests
- Theme switcher (dark/light mode)
- Responsive UI

---

## Key Routes

/ — catalog and filters
/skill/:id — skill details page
/login, /registration/step1..3 — authentication
/profile/* — profile, requests, exchanges, favorites, skills
/create — create skill page
/favorites — favorites list

---

## My Key Contributions

- Implemented full registration flow (3 steps)
- Developed Skill creation page (/create)
- Built Skill page with interactions (requests, related skills, success modal)
- Implemented profile sections (skills, requests, exchanges, favorites)
- Added notifications system and toast layer
- Implemented theme switcher and localStorage logic
- Added lazy routing and new pages (/favorites, /create)
- Set up test script and CI pipeline

---

##  Key Improvements (Post-Development Refactoring)

After the team phase, I independently improved the project:

###  Architecture & Stability
- Fixed build-breaking TypeScript issues  
- Unified domain models (User, Skill)  
- Eliminated duplicated types across modules  

###  State & Logic Consistency
- Refactored catalog and filtering logic  
- Removed duplicated state sources  
- Fixed inconsistent naming (`wantToLearn` vs `wantsToLearn`)  

###  Authentication
- Consolidated auth logic (Redux vs localStorage)  
- Reduced duplication across layers  

###  Routing
- Fixed broken routes (/about, /favorites)  
- Improved navigation consistency  

### Performance & Code Quality
- Removed duplicate dispatch in search logic  
- Fixed ESLint configuration (ignored build artifacts)  

---

##  Known Limitations

- Some features are still in MVP state (Skill page, profile editing)
- Backend is mocked

---

##  Install

```bash
npm install
npm run dev