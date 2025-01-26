When working at JamLoop, the engineering team mainly collaborates asynchronously over
email, slack, and GitHub PR reviews. The team does utilize routine scrum ceremonies to
facilitate face-to-face discussions, and in-depth technical specification reviews, usually after
researching and learning about the topics ahead of time. The JamLoop UI Engineer Challenge
will attempt to simulate this workflow for potential JamLoop engineering candidates.

Story
JamLoop is a DSP that has many customers that represent smaller, mid-sized businesses.
When customers want to place their video advertisements on JamLoop connected inventory,
they create a “campaign” to contain all of the information about the deal.
Example Campaign fields:
- Campaign Name
- Budget Goal (in USD)
- Start & End Dates
- Target Demographic (Age & Gender)
- Target Geo
- Country
- State
- City
- Zip Code
- Inventory / Publishers
- Hulu
- Discovery
- ABC
- A&E
- TLC
- Fox News
- Fox Sports
- Etc
- Screens/Devices
- CTV
- Mobile Device
- Web Browser

Requirements
● Create a Github repository to host the solution
● Create Next.JS application with the following
○ Use the UI component library of your choosing
○ Auth protected pages & API
■ Can be hardcoded credentials if needed but needs to have at least 2
accounts

○ Ability to create new campaigns
○ Ability to edit existing campaigns
○ Table view of existing campaigns
○ Isolated views based on the account
■ One account should not be able to change or view the other account’s
details

● You can use this service or something similar if it helps
○ https://crudcrud.com/
● Try to make the experience as smooth as possible for the user
Considerations
Please write the code as if someone will be reading it. Treat it as a production-level codebase.
You won’t have time to do everything needed for a production release, but what would you do if
you had more time? Keep a list and write a document about what is remaining before it is ready
for customers.