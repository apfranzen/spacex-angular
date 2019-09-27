# SpaceX Angular
##  Deployed

https://upbeat-euler-4cfa54.netlify.com/


  ## Languages and Frameworks

  - 3 Angular (2+)
  - 2 AngularJS (1.x)
  - 1 React
  - 4 Vue
  - 4 Ember
  - 1 Node.js
  - 4 Python
  - 4 PHP
  - 4 Scala
  - 3 Clojure
  - 4 Haskell
  - 4 Golang
  - 4 Ruby
  - 4 Perl
  - 3 Java
  - 4 Chef

## Development Environment

- `npm i` - install dependencies
- `ng serve` run the development server
- open your browser to `localhost:4200`

## Functionality & Design Rationale

- The `launches` by default are sorted by `launch_date`. The launches can be sorted by any of the headings by clicking on them
- `launches` are paginated with 12 results per page
- Because the `details` were much longer than the other headings, these are truncated unless that row is `active`, then it expands so the user can read.
- The `http` service was implemented as a service as opposed to implementing it inside the component itself. The reason for this approach is this allows for more flexibility in the future to handle more complex data processing, retry logic and handling intermittent connectivity.
- I chose to `GET` all launches at 1 time as opposed to using the `pagination` querystrings. I chose to do it this way so there is less lag when switching between pages.

## Next Steps

- Implement more robust error handling for the `http` request
- Write unit tests
- 🚀