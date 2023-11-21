# Front-end

This project was built using React.js with Next, although server-side rendering was not used but rather the view and components use "use client". Used local state in components and custom hooks to handle API calls and information handling.

## Features achieved

- Local username, saved locally in the browser to consult later and create new queries with the same user
- Query builder. Form with dropdowns and inputs (country, indicator, year, name of the query and comment) When generating the search, it consults the API and shows the required information in a graph
- Community query feed. Space where other people's queries appear and can be selected to learn about their research
- Comments in the consultations, to open the space for debate and reinforce the research
- Mutiplayer: by opening a new incognito project window, you can see other users' contributions and comment with a different username

## Future work

This project brought many learnings and challenges. Below are some of the recommendations that I observed and that I could not make due to limited time and lack of knowledge about it.

- A global state manager should be used, to avoid prop drilling through components. For example Redux.
- Simplify some components to make them more reusable
- Use validators under schema to avoid errors in the forms, for example yup
- I left TODOs comments throughout the code where possible specific improvements can be found
- Centralize variables such as user messages or components and manage localization and i18n in the future.
- Add pagination to queries and comments, etc
- A problem was found when deploying the project in Docker, there are documented errors in this regard, below is some of the literature consulted to resolve this problem.
  -- https://stackoverflow.com/questions/70787678/docker-cannot-find-module-when-running-nextjs-app-in-a-docker-compose
  -- https://github.com/vercel/next.js/discussions/39432
  -- https://stackoverflow.com/questions/70608086/i-am-getting-error-while-converting-my-next-js-project-to-docker
  -- https://nextjs.org/docs/app/building-your-application/deploying#docker-image
